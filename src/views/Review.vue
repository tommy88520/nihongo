<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { Word } from '../data/words'
import { dueWords, newWords } from '../lib/queue'
import { speak } from '../lib/speak'
import { grade, previewInterval, state, type Grade } from '../lib/store'

const queue = ref<Word[]>([])
const total = ref(0)
const done = ref(0)
const revealed = ref(false)
function savedFront(): 'jp' | 'zh' {
  try { return localStorage.getItem('nihongo:front') === 'zh' ? 'zh' : 'jp' } catch { return 'jp' }
}
const front = ref<'jp' | 'zh'>(savedFront())

function build() {
  queue.value = [...dueWords(), ...newWords()]
  total.value = queue.value.length
  done.value = 0
  revealed.value = false
}

const card = computed(() => queue.value[0])
const isNew = computed(() => card.value && !state.cards[card.value.id])

function reveal() {
  revealed.value = true
  if (card.value) speak(card.value.kana)
}

function answer(g: Grade) {
  const w = card.value
  if (!w) return
  grade(w.id, g)
  queue.value.shift()
  if (g === 0) queue.value.push(w) // 忘記的這輪最後再考一次
  else done.value++
  revealed.value = false
  if (front.value === 'jp' && queue.value[0]) speak(queue.value[0].kana)
}

function setFront(f: 'jp' | 'zh') {
  front.value = f
  try { localStorage.setItem('nihongo:front', f) } catch { /* ignore */ }
}

const buttons: { g: Grade; label: string; cls: string; key: string }[] = [
  { g: 0, label: '忘了', cls: 'bg-rose-500', key: '1' },
  { g: 1, label: '困難', cls: 'bg-amber-500', key: '2' },
  { g: 2, label: '記得', cls: 'bg-emerald-500', key: '3' },
  { g: 3, label: '簡單', cls: 'bg-sky-500', key: '4' },
]

function onKey(e: KeyboardEvent) {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault()
    if (!revealed.value) reveal()
  } else if (revealed.value) {
    const b = buttons.find((b) => b.key === e.key)
    if (b) answer(b.g)
  }
}

onMounted(() => {
  build()
  window.addEventListener('keydown', onKey)
})
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="flex min-h-[calc(100dvh-9rem)] flex-col gap-4">
    <div class="flex items-center gap-3 text-sm text-ink/50">
      <div class="h-2 flex-1 overflow-hidden rounded-full bg-black/10">
        <div class="h-full bg-shu transition-all" :style="{ width: total ? (done / total) * 100 + '%' : '0%' }" />
      </div>
      <span>{{ done }}/{{ total }}</span>
      <div class="flex rounded-lg bg-black/5 p-0.5 text-xs">
        <button class="rounded-md px-2 py-1" :class="front === 'jp' && 'bg-white shadow-sm'" @click="setFront('jp')">日→中</button>
        <button class="rounded-md px-2 py-1" :class="front === 'zh' && 'bg-white shadow-sm'" @click="setFront('zh')">中→日</button>
      </div>
    </div>

    <template v-if="card">
      <button
        class="relative flex flex-1 flex-col items-center justify-center gap-3 rounded-3xl bg-white p-6 shadow-sm"
        @click="revealed ? speak(card.kana) : reveal()"
      >
        <span class="absolute top-4 left-4 rounded-full bg-black/5 px-2 py-0.5 text-xs text-ink/50">{{ card.cat }}</span>
        <span v-if="isNew" class="absolute top-4 right-4 rounded-full bg-shu/10 px-2 py-0.5 text-xs text-shu">新</span>

        <template v-if="front === 'jp' || revealed">
          <span class="jp text-5xl font-medium">{{ card.kanji ?? card.kana }}</span>
          <span v-if="card.kanji && (revealed || front === 'zh')" class="jp text-xl text-ink/60">{{ card.kana }}</span>
        </template>
        <span v-if="front === 'zh' || revealed" class="text-2xl" :class="front === 'zh' && !revealed ? 'font-semibold' : 'text-ink/80'">
          {{ card.zh }}
        </span>

        <span v-if="!revealed" class="absolute bottom-5 text-sm text-ink/40">點一下看答案</span>
        <span v-else class="absolute bottom-5 text-sm text-ink/40">🔊 再點一次聽發音</span>
      </button>

      <div v-if="revealed" class="grid grid-cols-4 gap-2">
        <button
          v-for="b in buttons"
          :key="b.g"
          class="flex flex-col items-center rounded-2xl py-3 text-white active:scale-95 transition"
          :class="b.cls"
          @click="answer(b.g)"
        >
          <span class="font-semibold">{{ b.label }}</span>
          <span class="text-xs text-white/80">{{ previewInterval(card.id, b.g) }}</span>
        </button>
      </div>
      <button v-else class="rounded-2xl bg-ink py-4 font-semibold text-white" @click="reveal">顯示答案</button>
    </template>

    <div v-else class="flex flex-1 flex-col items-center justify-center gap-3 text-center">
      <div class="text-6xl">🎉</div>
      <h2 class="text-xl font-bold">今天的單字複習完了</h2>
      <p class="text-sm text-ink/50">明天再來，或到首頁調高每日新單字數</p>
      <RouterLink to="/kana/quiz" class="mt-2 rounded-full bg-shu px-5 py-2.5 text-white">去練五十音</RouterLink>
    </div>
  </div>
</template>
