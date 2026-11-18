<script setup lang="ts">
import { computed, ref } from 'vue'
import { allKana, groupLabels, type Kana, type KanaGroup } from '../data/kana'
import { speak } from '../lib/speak'
import { state } from '../lib/store'

type Mode = 'k2r' | 'r2k'
const script = ref<'hira' | 'kata' | 'mix'>('hira')
const groups = ref<KanaGroup[]>(['basic'])
const mode = ref<Mode>('k2r')
const length = ref(20)

const phase = ref<'setup' | 'quiz' | 'done'>('setup')
const questions = ref<{ k: Kana; s: 'hira' | 'kata'; options: Kana[] }[]>([])
const idx = ref(0)
const picked = ref<Kana | null>(null)
const correct = ref(0)
const misses = ref<{ k: Kana; s: 'hira' | 'kata' }[]>([])

const pool = computed(() => allKana.filter((k) => groups.value.includes(k.group)))
const settingKey = computed(() => `${script.value}|${mode.value}|${[...groups.value].sort().join(',')}`)

function shuffle<T>(a: T[]): T[] {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[b[i], b[j]] = [b[j], b[i]]
  }
  return b
}

function start() {
  const p = pool.value
  if (!p.length) return
  const picks: Kana[] = []
  while (picks.length < length.value) picks.push(...shuffle(p))
  questions.value = picks.slice(0, length.value).map((k) => {
    const s = script.value === 'mix' ? (Math.random() < 0.5 ? 'hira' : 'kata') : script.value
    // 干擾選項避開同拼音（ぢ/じ、づ/ず）
    const others = shuffle(p.filter((o) => o.romaji !== k.romaji)).slice(0, 3)
    return { k, s, options: shuffle([k, ...others]) }
  })
  idx.value = 0
  correct.value = 0
  misses.value = []
  picked.value = null
  phase.value = 'quiz'
}

const q = computed(() => questions.value[idx.value])

function choose(o: Kana) {
  if (picked.value) return
  picked.value = o
  const ok = o.romaji === q.value.k.romaji
  if (ok) correct.value++
  else misses.value.push({ k: q.value.k, s: q.value.s })
  speak(q.value.k.hira)
  setTimeout(next, ok ? 600 : 1400)
}

function next() {
  picked.value = null
  if (idx.value + 1 >= questions.value.length) {
    const pct = Math.round((correct.value / questions.value.length) * 100)
    state.kanaBest[settingKey.value] = Math.max(state.kanaBest[settingKey.value] ?? 0, pct)
    phase.value = 'done'
  } else idx.value++
}

function optionClass(o: Kana) {
  if (!picked.value) return 'bg-white active:bg-shu/10'
  if (o.romaji === q.value.k.romaji) return 'bg-emerald-500 text-white'
  if (o === picked.value) return 'bg-rose-500 text-white'
  return 'bg-white opacity-50'
}

function toggleGroup(g: KanaGroup) {
  groups.value = groups.value.includes(g) ? groups.value.filter((x) => x !== g) : [...groups.value, g]
}
</script>

<template>
  <div>
    <!-- 設定 -->
    <div v-if="phase === 'setup'" class="space-y-5">
      <div class="flex items-center gap-2">
        <RouterLink to="/kana" class="text-ink/50">‹ 返回</RouterLink>
      </div>
      <h1 class="text-2xl font-bold">五十音測驗</h1>

      <section class="space-y-2">
        <h2 class="text-sm text-ink/50">假名</h2>
        <div class="grid grid-cols-3 gap-2 text-sm">
          <button
            v-for="[v, l] in ([['hira', '平假名'], ['kata', '片假名'], ['mix', '混合']] as const)"
            :key="v"
            class="rounded-xl border py-2.5"
            :class="script === v ? 'border-shu bg-shu/10 text-shu' : 'border-black/10 bg-white'"
            @click="script = v"
          >{{ l }}</button>
        </div>
      </section>

      <section class="space-y-2">
        <h2 class="text-sm text-ink/50">範圍（可複選）</h2>
        <div class="grid grid-cols-3 gap-2 text-sm">
          <button
            v-for="(l, g) in groupLabels"
            :key="g"
            class="rounded-xl border py-2.5"
            :class="groups.includes(g) ? 'border-shu bg-shu/10 text-shu' : 'border-black/10 bg-white'"
            @click="toggleGroup(g)"
          >{{ l }}</button>
        </div>
      </section>

      <section class="space-y-2">
        <h2 class="text-sm text-ink/50">題型</h2>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <button
            class="rounded-xl border py-2.5"
            :class="mode === 'k2r' ? 'border-shu bg-shu/10 text-shu' : 'border-black/10 bg-white'"
            @click="mode = 'k2r'"
          >看假名選拼音</button>
          <button
            class="rounded-xl border py-2.5"
            :class="mode === 'r2k' ? 'border-shu bg-shu/10 text-shu' : 'border-black/10 bg-white'"
            @click="mode = 'r2k'"
          >看拼音選假名</button>
        </div>
      </section>

      <section class="space-y-2">
        <h2 class="text-sm text-ink/50">題數</h2>
        <div class="grid grid-cols-4 gap-2 text-sm">
          <button
            v-for="n in [10, 20, 30, 50]"
            :key="n"
            class="rounded-xl border py-2.5"
            :class="length === n ? 'border-shu bg-shu/10 text-shu' : 'border-black/10 bg-white'"
            @click="length = n"
          >{{ n }}</button>
        </div>
      </section>

      <p v-if="state.kanaBest[settingKey] != null" class="text-sm text-ink/50">
        這個設定的最佳成績：{{ state.kanaBest[settingKey] }}%
      </p>

      <button
        class="w-full rounded-2xl bg-shu py-4 text-lg font-bold text-white disabled:opacity-40"
        :disabled="!groups.length"
        @click="start"
      >開始（{{ pool.length }} 個假名）</button>
    </div>

    <!-- 作答 -->
    <div v-else-if="phase === 'quiz' && q" class="space-y-6">
      <div class="flex items-center gap-3 text-sm text-ink/50">
        <button @click="phase = 'setup'">✕</button>
        <div class="h-2 flex-1 overflow-hidden rounded-full bg-black/10">
          <div class="h-full bg-shu transition-all" :style="{ width: (idx / questions.length) * 100 + '%' }" />
        </div>
        <span>{{ idx + 1 }}/{{ questions.length }}</span>
      </div>

      <div class="flex h-48 items-center justify-center rounded-3xl bg-white shadow-sm">
        <span v-if="mode === 'k2r'" class="jp text-8xl">{{ q.k[q.s] }}</span>
        <span v-else class="text-6xl font-semibold">{{ q.k.romaji }}</span>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <button
          v-for="o in q.options"
          :key="o.romaji + o.hira"
          class="h-20 rounded-2xl shadow-sm transition"
          :class="optionClass(o)"
          @click="choose(o)"
        >
          <span v-if="mode === 'k2r'" class="text-2xl font-medium">{{ o.romaji }}</span>
          <span v-else class="jp text-4xl">{{ o[q.s] }}</span>
        </button>
      </div>
    </div>

    <!-- 結果 -->
    <div v-else class="space-y-5 text-center">
      <div class="pt-6 text-6xl font-bold text-shu">{{ Math.round((correct / questions.length) * 100) }}%</div>
      <p class="text-ink/60">答對 {{ correct }} / {{ questions.length }}</p>
      <div v-if="misses.length" class="rounded-2xl bg-white p-4 text-left shadow-sm">
        <h2 class="mb-2 text-sm text-ink/50">答錯的</h2>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="(m, i) in misses"
            :key="i"
            class="rounded-lg bg-rose-50 px-3 py-1.5"
            @click="speak(m.k.hira)"
          >
            <span class="jp text-xl">{{ m.k[m.s] }}</span>
            <span class="ml-1 text-sm text-ink/50">{{ m.k.romaji }}</span>
          </button>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <button class="rounded-2xl border border-black/10 bg-white py-3" @click="phase = 'setup'">改設定</button>
        <button class="rounded-2xl bg-shu py-3 font-bold text-white" @click="start">再來一次</button>
      </div>
    </div>
  </div>
</template>
