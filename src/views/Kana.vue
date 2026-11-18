<script setup lang="ts">
import { ref } from 'vue'
import { kanaTables, groupLabels, type KanaGroup } from '../data/kana'
import { speak } from '../lib/speak'

const script = ref<'hira' | 'kata'>('hira')
const group = ref<KanaGroup>('basic')
const showRomaji = ref(true)
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">五十音</h1>
      <RouterLink to="/kana/quiz" class="rounded-full bg-shu px-4 py-2 text-sm font-medium text-white">開始測驗</RouterLink>
    </div>

    <div class="grid grid-cols-2 rounded-xl bg-black/5 p-1 text-sm">
      <button
        v-for="s in (['hira', 'kata'] as const)"
        :key="s"
        class="rounded-lg py-2"
        :class="script === s ? 'bg-white font-semibold shadow-sm' : 'text-ink/60'"
        @click="script = s"
      >
        {{ s === 'hira' ? '平假名 あ' : '片假名 ア' }}
      </button>
    </div>

    <div class="flex gap-2 overflow-x-auto text-sm">
      <button
        v-for="(label, g) in groupLabels"
        :key="g"
        class="shrink-0 rounded-full border px-3 py-1.5"
        :class="group === g ? 'border-shu bg-shu/10 text-shu' : 'border-black/10 text-ink/60'"
        @click="group = g"
      >
        {{ label }}
      </button>
      <label class="ml-auto flex shrink-0 items-center gap-1.5 text-ink/60">
        <input v-model="showRomaji" type="checkbox" class="accent-shu" /> 拼音
      </label>
    </div>

    <div class="grid gap-2" :class="group === 'youon' ? 'grid-cols-3' : 'grid-cols-5'">
      <template v-for="(row, ri) in kanaTables[group]" :key="ri">
        <template v-for="(k, ci) in row" :key="ci">
          <button
            v-if="k"
            class="flex aspect-square flex-col items-center justify-center rounded-xl bg-white shadow-sm active:bg-shu/10"
            @click="speak(k.hira)"
          >
            <span class="jp text-2xl">{{ k[script] }}</span>
            <span v-if="showRomaji" class="text-[11px] text-ink/40">{{ k.romaji }}</span>
          </button>
          <div v-else />
        </template>
      </template>
    </div>
    <p class="text-center text-xs text-ink/40">點一下聽發音</p>
  </div>
</template>
