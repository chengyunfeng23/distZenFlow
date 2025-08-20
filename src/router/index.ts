import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/DefaultComponents.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue'),
    },
    {
      path: '/apiTextMd',
      name: 'apiTextMd',
      component: () => import('../views/apiTextMd.vue'),
    },
  ],
})

export default router
