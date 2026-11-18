<script setup lang="ts">
import { computed } from 'vue'
import { lessons, type Script } from '../data/lessons'
import { nextLesson, passed, unlocked } from '../lib/progress'
import { state } from '../lib/store'

const groups = computed(() =>
  (['hira', 'kata'] as Script[]).map((s) => ({
    s,
    label: s === 'hira' ? '平假名' : '片假名',
    list: lessons.filter((l) => l.script === s),
  })),
)
const next = computed(() => nextLesson())
</script>

<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">學假名</h1>
      <div class="flex gap-2 text-sm">
        <RouterLink to="/kana" class="rounded-full border border-black/10 bg-white px-3 py-1.5">五十音表</RouterLink>
        <RouterLink to="/kana/quiz" class="rounded-full border border-black/10 bg-white px-3 py-1.5">自由測驗</RouterLink>
      </div>
    </div>

    <p class="text-sm text-ink/60">
      一課學一行（約 5 個字）：先看、先聽，再小考。答對 80% 就解鎖下一課。一天 1～2 課就好。
    </p>

    <RouterLink
      v-if="next"
      :to="`/learn/${next.id}`"
      class="block rounded-2xl bg-shu p-5 text-white shadow-md transition active:scale-[0.98]"
    >
      <div class="text-sm text-white/80">下一課</div>
      <div class="mt-1 text-lg font-bold">{{ next.title }}</div>
      <div class="jp mt-1 text-2xl tracking-widest">{{ next.kana.map((k) => k[next!.script]).join(' ') }}</div>
    </RouterLink>

    <section v-for="g in groups" :key="g.s" class="space-y-2">
      <h2 class="text-sm font-semibold text-ink/50">{{ g.label }}</h2>
      <div class="overflow-hidden rounded-2xl bg-white shadow-sm">
        <component
          :is="unlocked(l) ? 'RouterLink' : 'div'"
          v-for="(l, i) in g.list"
          :key="l.id"
          :to="`/learn/${l.id}`"
          class="flex items-center gap-3 border-b border-black/5 px-4 py-3 last:border-0"
          :class="unlocked(l) ? 'active:bg-black/5' : 'opacity-40'"
        >
          <span
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm"
            :class="passed(l) ? 'bg-emerald-500 text-white' : unlocked(l) ? 'bg-shu/10 text-shu' : 'bg-black/5'"
          >{{ passed(l) ? '✓' : unlocked(l) ? i + 1 : '🔒' }}</span>
          <div class="min-w-0 flex-1">
            <div class="text-sm">{{ l.title }}</div>
            <div class="jp truncate text-ink/60">{{ l.kana.map((k) => k[l.script]).join(' ') }}</div>
          </div>
          <span v-if="state.lessons[l.id] != null" class="text-xs text-ink/40">{{ state.lessons[l.id] }}%</span>
        </component>
      </div>
    </section>
  </div>
</template>
