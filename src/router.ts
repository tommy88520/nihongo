import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import Kana from './views/Kana.vue'
import KanaQuiz from './views/KanaQuiz.vue'
import Review from './views/Review.vue'
import Words from './views/Words.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/kana', component: Kana },
    { path: '/kana/quiz', component: KanaQuiz },
    { path: '/review', component: Review },
    { path: '/words', component: Words },
  ],
})
