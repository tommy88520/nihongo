// 產生發音音檔（只能在 macOS 跑，用內建 Kyoko 語音＋afconvert）
//   node scripts/gen-audio.ts          只產生還沒有的
//   node scripts/gen-audio.ts --force  全部重做
// 輸出 public/audio/<audioName>.m4a，清單寫到 src/data/audioManifest.json
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { allKana } from '../src/data/kana.ts'
import { words } from '../src/data/words.ts'
import { audioName } from '../src/lib/audioName.ts'

const VOICE = 'Kyoko'
const OUT = 'public/audio'
const force = process.argv.includes('--force')

// key：網頁要唸的字；value：實際給 Kyoko 唸的內容＋語速
// 單一假名 TTS 只有 0.1 秒一閃而過，唸兩次（「あ、あ」）比較聽得清楚
const items = new Map<string, [string, number]>()
for (const k of allKana) items.set(k.hira, [`${k.hira}、${k.hira}`, 110])
for (const w of words) if (!items.has(w.kana)) items.set(w.kana, [w.kana, 150])

mkdirSync(OUT, { recursive: true })
const tmp = mkdtempSync(join(tmpdir(), 'nihongo-audio-'))

// 讀 16-bit PCM WAV（say 的輸出可能有額外 chunk，逐個找）
function readWav(buf: Buffer) {
  let p = 12
  let fmt: Buffer | undefined
  let data: Buffer | undefined
  while (p + 8 <= buf.length) {
    const id = buf.toString('ascii', p, p + 4)
    const size = buf.readUInt32LE(p + 4)
    const body = buf.subarray(p + 8, p + 8 + size)
    if (id === 'fmt ') fmt = body
    if (id === 'data') data = body
    p += 8 + size + (size % 2)
  }
  if (!fmt || !data) throw new Error('bad wav')
  const channels = fmt.readUInt16LE(2)
  const rate = fmt.readUInt32LE(4)
  const samples = new Int16Array(data.length / 2)
  for (let i = 0; i < samples.length; i++) samples[i] = data.readInt16LE(i * 2)
  return { channels, rate, samples }
}

function writeWav(path: string, rate: number, s: Int16Array) {
  const b = Buffer.alloc(44 + s.length * 2)
  b.write('RIFF', 0)
  b.writeUInt32LE(36 + s.length * 2, 4)
  b.write('WAVEfmt ', 8)
  b.writeUInt32LE(16, 16)
  b.writeUInt16LE(1, 20)
  b.writeUInt16LE(1, 22)
  b.writeUInt32LE(rate, 24)
  b.writeUInt32LE(rate * 2, 28)
  b.writeUInt16LE(2, 32)
  b.writeUInt16LE(16, 34)
  b.write('data', 36)
  b.writeUInt32LE(s.length * 2, 40)
  for (let i = 0; i < s.length; i++) b.writeInt16LE(s[i], 44 + i * 2)
  writeFileSync(path, b)
}

// 切掉前後靜音（留一點尾巴）、峰值拉到 -1dB
function process_(s: Int16Array, rate: number) {
  const th = 300
  let a = 0
  let z = s.length - 1
  while (a < s.length && Math.abs(s[a]) < th) a++
  while (z > a && Math.abs(s[z]) < th) z--
  a = Math.max(0, a - Math.round(rate * 0.01))
  z = Math.min(s.length - 1, z + Math.round(rate * 0.08))
  const cut = s.slice(a, z + 1)
  let peak = 1
  for (const v of cut) peak = Math.max(peak, Math.abs(v))
  const g = (32767 * 0.89) / peak
  const out = new Int16Array(cut.length)
  for (let i = 0; i < cut.length; i++) out[i] = Math.max(-32768, Math.min(32767, Math.round(cut[i] * g)))
  return out
}

let made = 0
const names: string[] = []
for (const [text, [say, rate]] of items) {
  const name = audioName(text)
  names.push(name)
  const dest = join(OUT, `${name}.m4a`)
  if (!force && existsSync(dest)) continue
  const raw = join(tmp, 'raw.wav')
  const norm = join(tmp, 'norm.wav')
  execFileSync('say', ['-v', VOICE, '-r', String(rate), '--file-format=WAVE', '--data-format=LEI16@24000', '-o', raw, say])
  const w = readWav(readFileSync(raw))
  if (w.channels !== 1) throw new Error('expected mono')
  writeWav(norm, w.rate, process_(w.samples, w.rate))
  execFileSync('afconvert', ['-f', 'm4af', '-d', 'aac', '-b', '64000', norm, dest])
  made++
}
rmSync(tmp, { recursive: true, force: true })

names.sort()
writeFileSync('src/data/audioManifest.json', JSON.stringify(names) + '\n')
console.log(`共 ${names.length} 個，這次新產生 ${made} 個`)
