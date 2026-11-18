<script setup lang="ts">
import { computed, ref } from 'vue'
import { categories, words } from '../data/words'
import { speak } from '../lib/speak'
import { state } from '../lib/store'

const cat = ref<string>('全部')
const q = ref('')

const list = computed(() => {
  const s = q.value.trim()
  return words.filter(
    (w) =>
      (cat.value === '全部' || w.cat === cat.value) &&
      (!s || w.kana.includes(s) || w.kanji?.includes(s) || w.zh.includes(s)),
  )
})

function status(id: string) {
  const c = state.cards[id]
  if (!c) return { label: '未學', cls: 'bg-black/5 text-ink/40' }
  if (c.interval >= 21) return { label: '熟練', cls: 'bg-emerald-100 text-emerald-700' }
  return { label: '學習中', cls: 'bg-amber-100 text-amber-700' }
}
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-bold">單字表 <span class="text-base font-normal text-ink/40">N5</span></h1>
    <input
      v-model="q"
      type="search"
      placeholder="搜尋假名、漢字或中文"
      class="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-base outline-none focus:border-shu"
    />
    <div class="-mx-4 flex gap-2 overflow-x-auto px-4 text-sm">
      <button
        v-for="c in ['全部', ...categories]"
        :key="c"
        class="shrink-0 rounded-full border px-3 py-1.5"
        :class="cat === c ? 'border-shu bg-shu/10 text-shu' : 'border-black/10 text-ink/60'"
        @click="cat = c"
      >{{ c }}</button>
    </div>
    <ul class="divide-y divide-black/5 overflow-hidden rounded-2xl bg-white shadow-sm">
      <li v-for="w in list" :key="w.id">
        <button class="flex w-full items-center gap-3 px-4 py-3 text-left active:bg-black/5" @click="speak(w.kana)">
          <div class="min-w-0 flex-1">
            <div class="jp text-lg">
              {{ w.kanji ?? w.kana }}
              <span v-if="w.kanji" class="ml-1 text-sm text-ink/50">{{ w.kana }}</span>
            </div>
            <div class="truncate text-sm text-ink/60">{{ w.zh }}</div>
          </div>
          <span class="shrink-0 rounded-full px-2 py-0.5 text-xs" :class="status(w.id).cls">{{ status(w.id).label }}</span>
        </button>
      </li>
      <li v-if="!list.length" class="px-4 py-8 text-center text-sm text-ink/40">找不到</li>
    </ul>
  </div>
</template>
