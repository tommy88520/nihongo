<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
function isActive(to: string) {
  if (to === '/') return route.path === '/'
  if (to === '/learn') return route.path.startsWith('/learn') || route.path.startsWith('/kana')
  return route.path.startsWith(to)
}
const tabs = [
  { to: '/', label: '首頁', icon: '🏠' },
  { to: '/learn', label: '學假名', icon: 'あ' },
  { to: '/review', label: '複習', icon: '🃏' },
  { to: '/words', label: '單字', icon: '📖' },
]
</script>

<template>
  <div class="mx-auto flex min-h-dvh max-w-xl flex-col">
    <main class="flex-1 px-4 pt-6 pb-28">
      <RouterView />
    </main>
    <nav
      class="fixed inset-x-0 bottom-0 border-t border-black/10 bg-paper/95 backdrop-blur"
      style="padding-bottom: env(safe-area-inset-bottom)"
    >
      <div class="mx-auto grid max-w-xl grid-cols-4">
        <RouterLink
          v-for="t in tabs"
          :key="t.to"
          :to="t.to"
          class="flex flex-col items-center gap-0.5 py-2 text-xs"
          :class="isActive(t.to) ? 'text-shu' : 'text-ink/50'"
        >
          <span class="jp text-xl leading-6">{{ t.icon }}</span>
          {{ t.label }}
        </RouterLink>
      </div>
    </nav>
  </div>
</template>
