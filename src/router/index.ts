import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/DefaultComponents.vue'

const router = createRouter({
  history: createWebHashHistory(),
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
