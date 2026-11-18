<script setup lang="ts">
import { computed } from 'vue'
import { words } from '../data/words'
import { dueWords, newWords, learnedCount, matureCount } from '../lib/queue'
import { state, streak, today } from '../lib/store'
import { hiraganaDone, nextLesson } from '../lib/progress'

const next = computed(() => nextLesson())
const kanaFirst = computed(() => !hiraganaDone())

const due = computed(() => dueWords().length)
const fresh = computed(() => newWords().length)
const doneToday = computed(() => state.daily[today()] ?? 0)

// 最近 7 天複習量
const week = computed(() => {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push({ label: '日一二三四五六'[d.getDay()], n: state.daily[today(d)] ?? 0 })
  }
  const max = Math.max(10, ...days.map((d) => d.n))
  return days.map((d) => ({ ...d, h: (d.n / max) * 100 }))
})
</script>

<template>
  <div class="space-y-5">
    <header>
      <p class="text-sm text-ink/50">今日も頑張ろう</p>
      <h1 class="text-2xl font-bold">日文練習帳</h1>
    </header>

    <div class="grid grid-cols-3 gap-3 text-center">
      <div class="rounded-2xl bg-white p-3 shadow-sm">
        <div class="text-2xl font-bold text-shu">{{ streak() }}</div>
        <div class="text-xs text-ink/50">連續天數 🔥</div>
      </div>
      <div class="rounded-2xl bg-white p-3 shadow-sm">
        <div class="text-2xl font-bold">{{ doneToday }}</div>
        <div class="text-xs text-ink/50">今日複習</div>
      </div>
      <div class="rounded-2xl bg-white p-3 shadow-sm">
        <div class="text-2xl font-bold">{{ learnedCount() }}<span class="text-sm text-ink/40">/{{ words.length }}</span></div>
        <div class="text-xs text-ink/50">已學單字</div>
      </div>
    </div>

    <RouterLink
      v-if="next"
      :to="`/learn/${next.id}`"
      class="block rounded-2xl p-5 shadow-md transition active:scale-[0.98]"
      :class="kanaFirst ? 'bg-shu text-white' : 'bg-white'"
    >
      <div class="text-sm" :class="kanaFirst ? 'text-white/80' : 'text-ink/50'">
        {{ kanaFirst && !state.lessons['hira-1'] ? '從這裡開始 👇' : '學假名・下一課' }}
      </div>
      <div class="mt-1 text-lg font-bold">{{ next.title }}</div>
      <div class="jp mt-1 text-2xl tracking-widest">{{ next.kana.map((k) => k[next!.script]).join(' ') }}</div>
    </RouterLink>

    <RouterLink
      to="/review"
      class="block rounded-2xl p-5 shadow-sm transition active:scale-[0.98]"
      :class="kanaFirst ? 'bg-white' : 'bg-shu text-white shadow-md'"
    >
      <div class="text-lg font-bold">複習單字</div>
      <div class="mt-1 text-sm" :class="kanaFirst ? 'text-ink/50' : 'text-white/85'">
        <template v-if="kanaFirst">建議先學完平假名（10 課）再開始背單字</template>
        <template v-else-if="due + fresh > 0">待複習 {{ due }} 張・新單字 {{ fresh }} 張</template>
        <template v-else>今天的份量完成了！🎉</template>
      </div>
    </RouterLink>

    <section class="rounded-2xl bg-white p-4 shadow-sm">
      <div class="mb-3 flex items-baseline justify-between">
        <h2 class="font-semibold">最近 7 天</h2>
        <span class="text-xs text-ink/40">熟練單字 {{ matureCount() }}</span>
      </div>
      <div class="flex h-24 items-end gap-2">
        <div v-for="(d, i) in week" :key="i" class="flex h-full flex-1 flex-col items-center gap-1">
          <div class="h-3 text-[10px] leading-3 text-ink/40">{{ d.n || '' }}</div>
          <div class="flex w-full flex-1 items-end">
            <div class="w-full rounded-t bg-shu/80" :style="{ height: Math.max(d.h, 3) + '%' }" />
          </div>
          <div class="text-xs text-ink/50">{{ d.label }}</div>
        </div>
      </div>
    </section>

    <section class="rounded-2xl bg-white p-4 shadow-sm">
      <label class="flex items-center justify-between text-sm">
        <span>每日新單字</span>
        <select v-model.number="state.newPerDay" class="rounded-lg border border-black/10 bg-paper px-2 py-1">
          <option v-for="n in [5, 10, 15, 20, 30]" :key="n" :value="n">{{ n }}</option>
        </select>
      </label>
    </section>
  </div>
</template>
