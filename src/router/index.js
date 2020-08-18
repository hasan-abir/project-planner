import Vue from 'vue'
import VueRouter from 'vue-router'
import { getCurrentUser } from '../firebase'

import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    async beforeEnter(to, from, next) {
      if (await getCurrentUser()) {
        next('dashboard')
      } else {
        next()
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    async beforeEnter(to, from, next) {
      if (await getCurrentUser()) {
        next('dashboard')
      } else {
        next()
      }
    },
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (requiresAuth && !(await getCurrentUser())) {
    next('login')
  } else {
    next()
  }
})

export default router
