import { reactive, watch } from 'vue'

export interface Card {
  due: number // 下次複習時間 (ms)
  interval: number // 天
  ease: number
  reps: number
  lapses: number
  added: string // 第一次學習的日期 YYYY-MM-DD
}

export type Grade = 0 | 1 | 2 | 3 // 再一次 / 困難 / 良好 / 簡單

interface State {
  cards: Record<string, Card>
  daily: Record<string, number> // YYYY-MM-DD → 當天複習次數
  newPerDay: number
  kanaBest: Record<string, number> // 測驗設定 → 最佳正確率
  lessons: Record<string, number> // 假名課 id → 最佳正確率（第一次就答對的比例）
}

const KEY = 'nihongo:v1'
const DAY = 86_400_000

function load(): State {
  const fallback: State = { cards: {}, daily: {}, newPerDay: 10, kanaBest: {}, lessons: {} }
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback
  } catch {
    return fallback
  }
}

export const state = reactive<State>(load())

watch(state, (s) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    /* 私密模式等情況寫不進去就算了 */
  }
}, { deep: true })

export function today(d = new Date()) {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

/** 簡化版 SM-2 */
export function grade(id: string, g: Grade) {
  const now = Date.now()
  const c: Card = state.cards[id] ?? { due: now, interval: 0, ease: 2.5, reps: 0, lapses: 0, added: today() }
  if (g === 0) {
    c.lapses++
    c.reps = 0
    c.interval = 0
    c.ease = Math.max(1.3, c.ease - 0.2)
    c.due = now + 60_000 // 1 分鐘後再出現
  } else {
    c.reps++
    if (c.reps === 1) c.interval = g === 3 ? 4 : g === 2 ? 1 : 0.5
    else if (c.reps === 2) c.interval = g === 3 ? 7 : g === 2 ? 3 : 1.5
    else c.interval = c.interval * (g === 1 ? 1.2 : g === 2 ? c.ease : c.ease * 1.3)
    c.ease = Math.max(1.3, c.ease + (g === 1 ? -0.15 : g === 3 ? 0.15 : 0))
    c.due = now + c.interval * DAY
  }
  state.cards[id] = c
  const t = today()
  state.daily[t] = (state.daily[t] ?? 0) + 1
}

/** 預覽某個按鈕會把下次複習排到多久後 */
export function previewInterval(id: string, g: Grade): string {
  const c = state.cards[id]
  if (g === 0) return '1 分'
  const reps = (c?.reps ?? 0) + 1
  const ease = c?.ease ?? 2.5
  const iv =
    reps === 1 ? (g === 3 ? 4 : g === 2 ? 1 : 0.5)
    : reps === 2 ? (g === 3 ? 7 : g === 2 ? 3 : 1.5)
    : (c?.interval ?? 1) * (g === 1 ? 1.2 : g === 2 ? ease : ease * 1.3)
  if (iv < 1) return `${Math.round(iv * 24)} 小時`
  if (iv < 30) return `${Math.round(iv)} 天`
  if (iv < 365) return `${Math.round(iv / 30)} 個月`
  return `${(iv / 365).toFixed(1)} 年`
}

export function newLearnedToday() {
  const t = today()
  return Object.values(state.cards).filter((c) => c.added === t).length
}

export function streak() {
  let n = 0
  const d = new Date()
  if (!state.daily[today(d)]) d.setDate(d.getDate() - 1)
  while (state.daily[today(d)]) {
    n++
    d.setDate(d.getDate() - 1)
  }
  return n
}
