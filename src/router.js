import { createRouter, createWebHistory } from 'vue-router'
import { authService } from './services/authService'

const Home = () => import('./views/Home.vue')
const EventDetail = () => import('./views/EventDetail.vue')
const AdminDashboard = () => import('./views/AdminDashboard.vue')
const Login = () => import('./views/Login.vue')
const NewsDetail = () => import('./views/NewsDetail.vue')

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
    path: '/news/:id',
    name: 'NewsDetail',
    component: NewsDetail,
    props: true,
    meta: { layout: 'MainLayout' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'AdminLayout' } // Use same clean layout or none
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { layout: 'AdminLayout', requiresAuth: false }
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

// Navigation Guard
router.beforeEach((to, from, next) => {
  next();
});

export default router
