import { kanaTables, type Kana } from './kana'

export type Script = 'hira' | 'kata'

export interface Lesson {
  id: string // 進度 key，不能改
  script: Script
  title: string
  kana: Kana[]
}

// 每個假名的來源漢字（平假名＝草書、片假名＝取一部分）
export const origin: Record<string, string> = {
  あ: '安', い: '以', う: '宇', え: '衣', お: '於', か: '加', き: '幾', く: '久', け: '計', こ: '己',
  さ: '左', し: '之', す: '寸', せ: '世', そ: '曽', た: '太', ち: '知', つ: '川', て: '天', と: '止',
  な: '奈', に: '仁', ぬ: '奴', ね: '祢', の: '乃', は: '波', ひ: '比', ふ: '不', へ: '部', ほ: '保',
  ま: '末', み: '美', む: '武', め: '女', も: '毛', や: '也', ゆ: '由', よ: '与', ら: '良', り: '利',
  る: '留', れ: '礼', ろ: '呂', わ: '和', を: '遠', ん: '无',
  ア: '阿', イ: '伊', ウ: '宇', エ: '江', オ: '於', カ: '加', キ: '幾', ク: '久', ケ: '介', コ: '己',
  サ: '散', シ: '之', ス: '須', セ: '世', ソ: '曽', タ: '多', チ: '千', ツ: '川', テ: '天', ト: '止',
  ナ: '奈', ニ: '二', ヌ: '奴', ネ: '祢', ノ: '乃', ハ: '八', ヒ: '比', フ: '不', ヘ: '部', ホ: '保',
  マ: '末', ミ: '三', ム: '牟', メ: '女', モ: '毛', ヤ: '也', ユ: '由', ヨ: '与', ラ: '良', リ: '利',
  ル: '流', レ: '礼', ロ: '呂', ワ: '和', ヲ: '乎', ン: '尓',
}

// 特別要注意的發音（其他照注音近似就好）
export const soundTip: Record<string, string> = {
  u: '嘴唇不要嘟起來，比ㄨ扁一點',
  shi: '唸「西」，不是 si',
  chi: '唸「七」，不是 ti',
  tsu: '像「疵」，舌尖頂一下牙齒後面',
  fu: '介於ㄈㄨ和ㄏㄨ之間，上排牙齒不要碰嘴唇',
  hi: '比「嘻」多一點氣音',
  ra: 'ら行介於ㄌ和ㄉ之間，舌尖輕輕彈一下',
  ri: 'ら行介於ㄌ和ㄉ之間，舌尖輕輕彈一下',
  ru: 'ら行介於ㄌ和ㄉ之間，舌尖輕輕彈一下',
  re: 'ら行介於ㄌ和ㄉ之間，舌尖輕輕彈一下',
  ro: 'ら行介於ㄌ和ㄉ之間，舌尖輕輕彈一下',
  wo: '跟 お 唸法一樣，只當助詞用',
  n: '鼻音，自己算一拍，像「嗯」',
  ji: 'じ 和 ぢ 唸法一樣，幾乎都用 じ',
  zu: 'ず 和 づ 唸法一樣，幾乎都用 ず',
}

const C: Record<string, string> = { k: 'ㄎ', s: 'ㄙ', t: 'ㄊ', n: 'ㄋ', h: 'ㄏ', m: 'ㄇ', y: '', r: 'ㄌ', w: 'ㄨ', g: 'ㄍ', z: 'ㄗ', d: 'ㄉ', b: 'ㄅ', p: 'ㄆ' }
const V: Record<string, string> = { a: 'ㄚ', i: '一', u: 'ㄨ', e: 'ㄝ', o: 'ㄛ' }
const special: Record<string, string> = {
  shi: 'ㄒ一', chi: 'ㄑ一', tsu: 'ㄘ', fu: 'ㄈㄨ', n: 'ㄣ', wo: 'ㄛ', ji: 'ㄐ一', zu: 'ㄗㄨ',
  ya: '一ㄚ', yu: '一ㄨ', yo: '一ㄛ', wa: 'ㄨㄚ',
}

/** 注音近似音（只是幫忙入門，以發音為準） */
export function zhuyin(romaji: string): string {
  if (special[romaji]) return special[romaji]
  if (romaji.length === 1) return V[romaji] ?? ''
  // 拗音 kya / sha / cha / ja
  const m = romaji.match(/^(sh|ch|j|[a-z]y)([auo])$/)
  if (m) {
    const head = m[1] === 'sh' ? 'ㄒ' : m[1] === 'ch' ? 'ㄑ' : m[1] === 'j' ? 'ㄐ' : C[m[1][0]]
    return head + '一' + V[m[2]]
  }
  return (C[romaji[0]] ?? '') + (V[romaji.slice(1)] ?? '')
}

const rowNames = ['あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ']

function build(script: Script): Lesson[] {
  const label = script === 'hira' ? '平假名' : '片假名'
  const basic = kanaTables.basic
  const rows = basic.map((r) => r.filter((k): k is Kana => !!k))
  // わ行和ん併成一課
  const lessons: Lesson[] = rows.slice(0, 9).map((kana, i) => ({
    id: `${script}-${i + 1}`,
    script,
    title: `${label}・${script === 'hira' ? rowNames[i] : kana[0].kata}行`,
    kana,
  }))
  lessons.push({
    id: `${script}-10`,
    script,
    title: `${label}・${script === 'hira' ? 'わ' : 'ワ'}行＋${script === 'hira' ? 'ん' : 'ン'}`,
    kana: [...rows[9], ...rows[10]],
  })
  const flat = (rs: (Kana | null)[][]) => rs.flat().filter((k): k is Kana => !!k)
  const d = kanaTables.dakuten
  lessons.push(
    { id: `${script}-11`, script, title: `${label}・濁音 が ざ だ`, kana: flat(d.slice(0, 3)).filter((k) => k.hira !== 'ぢ' && k.hira !== 'づ') },
    { id: `${script}-12`, script, title: `${label}・濁音 ば・半濁音 ぱ`, kana: flat(d.slice(3, 5)) },
    { id: `${script}-13`, script, title: `${label}・拗音 きゃ しゃ ちゃ…`, kana: flat(kanaTables.youon.slice(0, 6)) },
    { id: `${script}-14`, script, title: `${label}・拗音 りゃ ぎゃ じゃ…`, kana: flat(kanaTables.youon.slice(6)) },
  )
  return lessons
}

export const lessons: Lesson[] = [...build('hira'), ...build('kata')]

export function lessonById(id: string) {
  return lessons.find((l) => l.id === id)
}

/** 這一課之前（同一種假名）已經教過的字 */
export function previousKana(l: Lesson): Kana[] {
  const same = lessons.filter((x) => x.script === l.script)
  return same.slice(0, same.indexOf(l)).flatMap((x) => x.kana)
}

export const PASS = 80
