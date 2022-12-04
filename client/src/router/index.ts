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
    {
        path: '/admin/products',
        name: 'admin_products',
        component: () => import('../views/admin/ProductsList.vue'),
    },
    {
        path: '/admin/product/:id',
        name: 'admin_product_edit',
        component: () => import('../views/admin/ProductEdit.vue'),
    },
    {
        path: '/admin/product_images/:id',
        name: 'admin_product_images',
        component: () => import('../views/admin/ProductImages.vue'),
    },
  ]
})

export default router
