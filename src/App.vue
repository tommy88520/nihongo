<script setup lang="ts">
const tabs = [
  { to: '/', label: '首頁', icon: '🏠' },
  { to: '/kana', label: '五十音', icon: 'あ' },
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
          class="flex flex-col items-center gap-0.5 py-2 text-xs text-ink/50"
          exact-active-class="!text-shu"
        >
          <span class="jp text-xl leading-6">{{ t.icon }}</span>
          {{ t.label }}
        </RouterLink>
      </div>
    </nav>
  </div>
</template>
