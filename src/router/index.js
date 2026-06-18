import { createRouter, createWebHistory } from 'vue-router'
import Shop from '@/views/Shop.vue'
import Contact from '@/views/Contact.vue'
import About from '@/views/About.vue'
import HomeView from '@/views/HomeView.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ResetPassword from '@/views/ResetPassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { guest: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { guest: true }
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPassword,
      meta: { guest: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user') !== null
  
  if (to.meta.guest && isAuthenticated) {
    next('/home')
  } else {
    next()
  }
})

export default router