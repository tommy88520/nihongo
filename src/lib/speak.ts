// 發音：優先播預錄音檔（public/audio，由 scripts/gen-audio.ts 產生，音量一致又夠大），
// 沒有音檔的字才用瀏覽器內建的 Web Speech API。
import manifest from '../data/audioManifest.json'
import { audioName } from './audioName'

const hasFile = new Set<string>(manifest)
const cache = new Map<string, HTMLAudioElement>()
let playing: HTMLAudioElement | undefined

function setPlaybackSession() {
  // iOS 17+：當成「播放媒體」，不受靜音鍵影響、走媒體音量
  try {
    const nav = navigator as Navigator & { audioSession?: { type: string } }
    if (nav.audioSession) nav.audioSession.type = 'playback'
  } catch {
    /* ignore */
  }
}
setPlaybackSession()

function audioFor(name: string) {
  let a = cache.get(name)
  if (!a) {
    a = new Audio(`${import.meta.env.BASE_URL}audio/${name}.m4a`)
    a.preload = 'auto'
    cache.set(name, a)
  }
  return a
}

/** 先載入，之後點下去就馬上有聲音（例如進到一課時把這課的字先載好） */
export function preload(texts: string[]) {
  for (const t of texts) {
    const n = audioName(t)
    if (hasFile.has(n)) audioFor(n)
  }
}

// ---- 瀏覽器語音（備援）----
let jaVoice: SpeechSynthesisVoice | undefined
let utter: SpeechSynthesisUtterance | undefined // iOS 會回收還在唸的 utterance，留參考
const hasTTS = () => typeof speechSynthesis !== 'undefined' && typeof SpeechSynthesisUtterance !== 'undefined'

function pickVoice() {
  try {
    const voices = speechSynthesis.getVoices()
    jaVoice =
      voices.find((v) => v.lang.replace('_', '-') === 'ja-JP' && /Kyoko|O-ren|Google/.test(v.name)) ??
      voices.find((v) => v.lang.replace('_', '-').startsWith('ja'))
  } catch {
    /* ignore */
  }
}
if (hasTTS()) {
  pickVoice()
  speechSynthesis.addEventListener?.('voiceschanged', pickVoice)
}

function say(text: string) {
  if (!jaVoice) pickVoice()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'ja-JP'
  u.rate = 0.85
  if (jaVoice) u.voice = jaVoice
  utter = u
  u.onend = () => {
    if (utter === u) utter = undefined
  }
  speechSynthesis.speak(u)
}

function speakTTS(text: string) {
  if (!hasTTS()) return
  try {
    // Safari 在 cancel() 後馬上 speak() 常沒聲音，要隔一下
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel()
      setTimeout(() => say(text), 80)
    } else say(text)
  } catch {
    /* ignore */
  }
}

export function speak(text: string) {
  setPlaybackSession()
  if (playing) {
    playing.pause()
    playing = undefined
  }
  const name = audioName(text)
  if (!hasFile.has(name)) return speakTTS(text)
  const a = audioFor(name)
  try {
    a.currentTime = 0
  } catch {
    /* ignore */
  }
  a.volume = 1
  playing = a
  // 自動播放被擋（還沒點過畫面）就算了；載入失敗才改用瀏覽器語音
  a.play().catch((e: unknown) => {
    if (e instanceof DOMException && e.name === 'NotAllowedError') return
    speakTTS(text)
  })
}
