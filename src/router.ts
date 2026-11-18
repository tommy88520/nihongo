import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import Kana from './views/Kana.vue'
import Learn from './views/Learn.vue'
import Lesson from './views/Lesson.vue'
import KanaQuiz from './views/KanaQuiz.vue'
import Review from './views/Review.vue'
import Words from './views/Words.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/learn', component: Learn },
    { path: '/learn/:id', component: Lesson },
    { path: '/kana', component: Kana },
    { path: '/kana/quiz', component: KanaQuiz },
    { path: '/review', component: Review },
    { path: '/words', component: Words },
  ],
})
