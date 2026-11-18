<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Kana } from '../data/kana'
import { lessonById, origin, PASS, previousKana, soundTip, zhuyin } from '../data/lessons'
import { nextLesson } from '../lib/progress'
import { preload, speak } from '../lib/speak'
import { state, today } from '../lib/store'

const route = useRoute()
const router = useRouter()
const lesson = computed(() => lessonById(String(route.params.id)))
const s = computed(() => lesson.value?.script ?? 'hira')

type Q = { k: Kana; type: 'see' | 'hear'; options: Kana[]; retry?: boolean }
const phase = ref<'intro' | 'quiz' | 'done'>('intro')
const i = ref(0) // 介紹到第幾個字
const queue = ref<Q[]>([])
const total = ref(0)
const firstTry = ref(0)
const answered = ref(0)
const picked = ref<Kana | null>(null)

const cur = computed(() => lesson.value?.kana[i.value])
const q = computed(() => queue.value[0])
const score = computed(() => (total.value ? Math.round((firstTry.value / total.value) * 100) : 0))

function shuffle<T>(a: T[]): T[] {
  const b = [...a]
  for (let j = b.length - 1; j > 0; j--) {
    const r = Math.floor(Math.random() * (j + 1))
    ;[b[j], b[r]] = [b[r], b[j]]
  }
  return b
}

function reset() {
  phase.value = 'intro'
  i.value = 0
  picked.value = null
  if (lesson.value) preload(lesson.value.kana.map((k) => k.hira))
  if (cur.value) setTimeout(() => speak(cur.value!.hira), 300)
}
onMounted(reset)
watch(() => route.params.id, reset)

function nextIntro() {
  if (!lesson.value) return
  if (i.value + 1 < lesson.value.kana.length) {
    i.value++
    speak(cur.value!.hira)
  } else startQuiz()
}

function optionsFor(k: Kana, pool: Kana[]): Kana[] {
  const others = shuffle(pool.filter((o) => o.romaji !== k.romaji && o[s.value] !== k[s.value]))
  return shuffle([k, ...others.slice(0, 3)])
}

function startQuiz() {
  const l = lesson.value!
  const prev = previousKana(l)
  // 干擾選項優先用這課的字，不夠再從學過的補
  const pool = [...l.kana, ...shuffle(prev).slice(0, 8)]
  const qs: Q[] = []
  for (const k of l.kana) {
    qs.push({ k, type: 'see', options: optionsFor(k, pool) })
    qs.push({ k, type: 'hear', options: optionsFor(k, pool) })
  }
  for (const k of shuffle(prev).slice(0, 5)) {
    qs.push({ k, type: Math.random() < 0.5 ? 'see' : 'hear', options: optionsFor(k, [...pool, ...prev]) })
  }
  queue.value = shuffle(qs)
  total.value = qs.length
  firstTry.value = 0
  answered.value = 0
  picked.value = null
  phase.value = 'quiz'
  playQ()
}

function playQ() {
  if (q.value?.type === 'hear') setTimeout(() => speak(q.value!.k.hira), 250)
}

function choose(o: Kana) {
  if (picked.value || !q.value) return
  picked.value = o
  const ok = o.romaji === q.value.k.romaji
  if (ok && !q.value.retry) firstTry.value++
  if (q.value.type === 'see') speak(q.value.k.hira)
  const t = today()
  state.daily[t] = (state.daily[t] ?? 0) + 1
  if (!ok) {
    // 答錯：等使用者看清楚正解，按「下一題」才繼續；這題排到最後再考一次
    return
  }
  setTimeout(advance, 700)
}

function advance() {
  const cur = queue.value.shift()!
  if (picked.value && picked.value.romaji !== cur.k.romaji) queue.value.push({ ...cur, retry: true, options: shuffle(cur.options) })
  else answered.value++
  picked.value = null
  if (!queue.value.length) finish()
  else playQ()
}

function finish() {
  const id = lesson.value!.id
  state.lessons[id] = Math.max(state.lessons[id] ?? 0, score.value)
  phase.value = 'done'
}

function optionClass(o: Kana) {
  if (!picked.value) return 'bg-white active:bg-shu/10'
  if (o.romaji === q.value!.k.romaji) return 'bg-emerald-500 text-white'
  if (o === picked.value) return 'bg-rose-500 text-white'
  return 'bg-white opacity-40'
}

const goNext = computed(() => nextLesson())
</script>

<template>
  <div v-if="!lesson" class="py-20 text-center text-ink/50">找不到這一課</div>

  <div v-else class="flex min-h-[calc(100dvh-9rem)] flex-col gap-4">
    <div class="flex items-center gap-3 text-sm text-ink/50">
      <button class="px-1 text-lg" aria-label="離開" @click="router.push('/learn')">✕</button>
      <div class="h-2 flex-1 overflow-hidden rounded-full bg-black/10">
        <div
          class="h-full bg-shu transition-all"
          :style="{
            width:
              phase === 'intro'
                ? (i / lesson.kana.length) * 40 + '%'
                : phase === 'quiz'
                  ? 40 + (answered / total) * 60 + '%'
                  : '100%',
          }"
        />
      </div>
      <span class="shrink-0">{{ lesson.title }}</span>
    </div>

    <!-- 1. 認識新字 -->
    <template v-if="phase === 'intro' && cur">
      <p class="text-center text-sm text-ink/50">新字 {{ i + 1 }} / {{ lesson.kana.length }}：看清楚、聽清楚，跟著唸出來</p>
      <button
        class="flex flex-1 flex-col items-center justify-center gap-2 rounded-3xl bg-white p-6 shadow-sm"
        @click="speak(cur.hira)"
      >
        <span class="jp text-[120px] leading-none">{{ cur[lesson.script] }}</span>
        <span class="mt-3 text-3xl font-semibold">{{ cur.romaji }}</span>
        <span class="text-lg text-ink/50">近似「{{ zhuyin(cur.romaji) }}」</span>
        <span v-if="soundTip[cur.romaji]" class="mt-1 rounded-lg bg-amber-50 px-3 py-1.5 text-sm text-amber-800">
          ⚠️ {{ soundTip[cur.romaji] }}
        </span>
        <span v-if="origin[cur[lesson.script]]" class="mt-2 text-sm text-ink/60">
          怎麼記：從漢字「<span class="jp text-base font-semibold">{{ origin[cur[lesson.script]] }}</span>」{{ lesson.script === 'hira' ? '的草書變來' : '取一部分變來' }}
        </span>
        <span class="mt-4 text-sm text-ink/40">🔊 點卡片再聽一次</span>
        <span v-if="i === 0" class="text-xs text-ink/40">沒聲音或太小聲？把電腦／手機的音量調大</span>
      </button>
      <div class="grid grid-cols-2 gap-3">
        <button class="rounded-2xl border border-black/10 bg-white py-4 disabled:opacity-30" :disabled="i === 0" @click="i--, speak(cur!.hira)">上一個</button>
        <button class="rounded-2xl bg-shu py-4 font-bold text-white" @click="nextIntro">
          {{ i + 1 < lesson.kana.length ? '記住了，下一個' : '開始小考' }}
        </button>
      </div>
    </template>

    <!-- 2. 小考 -->
    <template v-else-if="phase === 'quiz' && q">
      <p class="text-center text-sm text-ink/50">
        {{ q.type === 'see' ? '這個字怎麼唸？' : '聽發音，選出是哪個字' }}
        <span v-if="q.retry" class="text-rose-500">（剛剛答錯的）</span>
      </p>
      <button
        class="flex h-52 items-center justify-center rounded-3xl bg-white shadow-sm"
        @click="speak(q.k.hira)"
      >
        <span v-if="q.type === 'see'" class="jp text-8xl">{{ q.k[lesson.script] }}</span>
        <span v-else class="flex flex-col items-center gap-2 text-ink/60">
          <span class="text-6xl">🔊</span>
          <span class="text-sm">點這裡再聽一次</span>
        </span>
      </button>
      <div class="grid grid-cols-2 gap-3">
        <button
          v-for="o in q.options"
          :key="o.romaji + o.hira"
          class="flex h-20 flex-col items-center justify-center rounded-2xl shadow-sm transition"
          :class="optionClass(o)"
          @click="choose(o)"
        >
          <template v-if="q.type === 'see'">
            <span class="text-2xl font-medium">{{ o.romaji }}</span>
            <span class="text-xs opacity-60">{{ zhuyin(o.romaji) }}</span>
          </template>
          <span v-else class="jp text-4xl">{{ o[lesson.script] }}</span>
        </button>
      </div>
      <div v-if="picked && picked.romaji !== q.k.romaji" class="space-y-3">
        <p class="text-center text-sm">
          正確是 <span class="jp text-xl font-semibold">{{ q.k[lesson.script] }}</span>
          = {{ q.k.romaji }}（{{ zhuyin(q.k.romaji) }}），等一下會再考一次
        </p>
        <button class="w-full rounded-2xl bg-ink py-4 font-semibold text-white" @click="advance">下一題</button>
      </div>
    </template>

    <!-- 3. 結果 -->
    <div v-else class="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <div class="text-6xl">{{ score >= PASS ? '🎉' : '💪' }}</div>
      <div class="text-5xl font-bold" :class="score >= PASS ? 'text-shu' : 'text-ink'">{{ score }}%</div>
      <p class="text-ink/60">
        <template v-if="score >= PASS">過關！下一課解鎖了。</template>
        <template v-else>要 {{ PASS }}% 才過關，再練一次就會了。</template>
      </p>
      <div class="jp text-3xl tracking-widest">{{ lesson.kana.map((k) => k[lesson!.script]).join(' ') }}</div>
      <div class="grid w-full grid-cols-2 gap-3 pt-4">
        <button class="rounded-2xl border border-black/10 bg-white py-4" @click="reset">再學一次</button>
        <RouterLink
          v-if="score >= PASS && goNext"
          :to="`/learn/${goNext.id}`"
          class="rounded-2xl bg-shu py-4 font-bold text-white"
        >下一課</RouterLink>
        <button v-else class="rounded-2xl bg-shu py-4 font-bold text-white" @click="startQuiz">再考一次</button>
      </div>
    </div>
  </div>
</template>
