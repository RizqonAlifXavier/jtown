import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import EventDetail from './views/EventDetail.vue'
import AdminDashboard from './views/AdminDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: 'MainLayout' }
  },
  {
    path: '/event/:id',
    name: 'EventDetail',
    component: EventDetail,
    props: true,
    meta: { layout: 'MainLayout' }
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { layout: 'AdminLayout' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router
