import LoginViewVue from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
        path: '/products',
        name: 'products',
        component: ProductsView,
    },
    {
        path: '/product/:id',
        name: 'product',
        component: () => import('../views/ProductDetailsView.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: LoginViewVue,
    },
  ]
})

export default router
