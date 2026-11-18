export type KanaGroup = 'basic' | 'dakuten' | 'youon'
export interface Kana {
  hira: string
  kata: string
  romaji: string
  group: KanaGroup
}

// 每列：羅馬拼音、平假名、片假名；空字串代表該格空白
type Row = [string, string, string][]

const basic: Row[] = [
  [['a', 'あ', 'ア'], ['i', 'い', 'イ'], ['u', 'う', 'ウ'], ['e', 'え', 'エ'], ['o', 'お', 'オ']],
  [['ka', 'か', 'カ'], ['ki', 'き', 'キ'], ['ku', 'く', 'ク'], ['ke', 'け', 'ケ'], ['ko', 'こ', 'コ']],
  [['sa', 'さ', 'サ'], ['shi', 'し', 'シ'], ['su', 'す', 'ス'], ['se', 'せ', 'セ'], ['so', 'そ', 'ソ']],
  [['ta', 'た', 'タ'], ['chi', 'ち', 'チ'], ['tsu', 'つ', 'ツ'], ['te', 'て', 'テ'], ['to', 'と', 'ト']],
  [['na', 'な', 'ナ'], ['ni', 'に', 'ニ'], ['nu', 'ぬ', 'ヌ'], ['ne', 'ね', 'ネ'], ['no', 'の', 'ノ']],
  [['ha', 'は', 'ハ'], ['hi', 'ひ', 'ヒ'], ['fu', 'ふ', 'フ'], ['he', 'へ', 'ヘ'], ['ho', 'ほ', 'ホ']],
  [['ma', 'ま', 'マ'], ['mi', 'み', 'ミ'], ['mu', 'む', 'ム'], ['me', 'め', 'メ'], ['mo', 'も', 'モ']],
  [['ya', 'や', 'ヤ'], ['', '', ''], ['yu', 'ゆ', 'ユ'], ['', '', ''], ['yo', 'よ', 'ヨ']],
  [['ra', 'ら', 'ラ'], ['ri', 'り', 'リ'], ['ru', 'る', 'ル'], ['re', 'れ', 'レ'], ['ro', 'ろ', 'ロ']],
  [['wa', 'わ', 'ワ'], ['', '', ''], ['', '', ''], ['', '', ''], ['wo', 'を', 'ヲ']],
  [['n', 'ん', 'ン'], ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']],
]

const dakuten: Row[] = [
  [['ga', 'が', 'ガ'], ['gi', 'ぎ', 'ギ'], ['gu', 'ぐ', 'グ'], ['ge', 'げ', 'ゲ'], ['go', 'ご', 'ゴ']],
  [['za', 'ざ', 'ザ'], ['ji', 'じ', 'ジ'], ['zu', 'ず', 'ズ'], ['ze', 'ぜ', 'ゼ'], ['zo', 'ぞ', 'ゾ']],
  [['da', 'だ', 'ダ'], ['ji', 'ぢ', 'ヂ'], ['zu', 'づ', 'ヅ'], ['de', 'で', 'デ'], ['do', 'ど', 'ド']],
  [['ba', 'ば', 'バ'], ['bi', 'び', 'ビ'], ['bu', 'ぶ', 'ブ'], ['be', 'べ', 'ベ'], ['bo', 'ぼ', 'ボ']],
  [['pa', 'ぱ', 'パ'], ['pi', 'ぴ', 'ピ'], ['pu', 'ぷ', 'プ'], ['pe', 'ぺ', 'ペ'], ['po', 'ぽ', 'ポ']],
]

const youon: Row[] = [
  ['k', 'き', 'キ'], ['s', 'し', 'シ'], ['c', 'ち', 'チ'], ['n', 'に', 'ニ'], ['h', 'ひ', 'ヒ'],
  ['m', 'み', 'ミ'], ['r', 'り', 'リ'], ['g', 'ぎ', 'ギ'], ['j', 'じ', 'ジ'], ['b', 'び', 'ビ'], ['p', 'ぴ', 'ピ'],
].map(([c, h, k]) => {
  const head = c === 's' ? 'sh' : c === 'c' ? 'ch' : c === 'j' ? 'j' : c + 'y'
  return (['a', 'u', 'o'] as const).map((v, i) => [
    head + v,
    h + 'ゃゅょ'[i],
    k + 'ャュョ'[i],
  ]) as [string, string, string][]
})

function toKana(rows: Row[], group: KanaGroup): (Kana | null)[][] {
  return rows.map((r) => r.map(([romaji, hira, kata]) => (romaji ? { romaji, hira, kata, group } : null)))
}

export const kanaTables: Record<KanaGroup, (Kana | null)[][]> = {
  basic: toKana(basic, 'basic'),
  dakuten: toKana(dakuten, 'dakuten'),
  youon: toKana(youon, 'youon'),
}

export const groupLabels: Record<KanaGroup, string> = {
  basic: '清音',
  dakuten: '濁音・半濁音',
  youon: '拗音',
}

export const allKana: Kana[] = Object.values(kanaTables).flat(2).filter((k): k is Kana => !!k)
