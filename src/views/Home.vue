<script setup lang="ts">
import { computed } from 'vue'
import { words } from '../data/words'
import { dueWords, newWords, learnedCount, matureCount } from '../lib/queue'
import { state, streak, today } from '../lib/store'

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
      to="/review"
      class="block rounded-2xl bg-shu p-5 text-white shadow-md active:scale-[0.98] transition"
    >
      <div class="text-lg font-bold">開始複習單字</div>
      <div class="mt-1 text-sm text-white/85">
        <template v-if="due + fresh > 0">待複習 {{ due }} 張・新單字 {{ fresh }} 張</template>
        <template v-else>今天的份量完成了！🎉</template>
      </div>
    </RouterLink>

    <RouterLink
      to="/kana/quiz"
      class="block rounded-2xl bg-white p-5 shadow-sm active:scale-[0.98] transition"
    >
      <div class="text-lg font-bold"><span class="jp">あア</span> 五十音測驗</div>
      <div class="mt-1 text-sm text-ink/50">看假名選拼音，或看拼音選假名</div>
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
