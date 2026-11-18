import { lessons, PASS, type Lesson } from '../data/lessons'
import { state } from './store'

export function passed(l: Lesson) {
  return (state.lessons[l.id] ?? 0) >= PASS
}

/** 前一課過了才解鎖；片假名要平假名清音（第 10 課）過了才開 */
export function unlocked(l: Lesson) {
  const i = lessons.indexOf(l)
  if (i === 0) return true
  if (l.id === 'kata-1') return passed(lessons.find((x) => x.id === 'hira-10')!)
  return passed(lessons[i - 1])
}

/** 下一個該上的課（沒過的第一課） */
export function nextLesson(): Lesson | undefined {
  return lessons.find((l) => unlocked(l) && !passed(l))
}

export function hiraganaDone() {
  return passed(lessons.find((x) => x.id === 'hira-10')!)
}
