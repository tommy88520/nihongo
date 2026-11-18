import { words, type Word } from '../data/words'
import { state, newLearnedToday } from './store'

export function dueWords(now = Date.now()): Word[] {
  return words
    .filter((w) => state.cards[w.id] && state.cards[w.id].due <= now)
    .sort((a, b) => state.cards[a.id].due - state.cards[b.id].due)
}

export function newWords(): Word[] {
  const left = Math.max(0, state.newPerDay - newLearnedToday())
  return words.filter((w) => !state.cards[w.id]).slice(0, left)
}

export function learnedCount() {
  return Object.keys(state.cards).length
}

/** 熟練：間隔 ≥ 21 天 */
export function matureCount() {
  return Object.values(state.cards).filter((c) => c.interval >= 21).length
}
