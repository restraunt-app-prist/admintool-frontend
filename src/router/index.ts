import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import { useAuthStore } from '@/stores/auth'
import MenuListPage from '@/views/MenuList.vue'
import EditMenuItemPage from '@/views/EditMenuItem.vue'
import CreateMenuItemPage from '@/views/CreateMenuItem.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/menu',
    name: 'MenuList',
    component: MenuListPage,
    meta: { requiresAuth: true }, // This route requires authentication
  },
  {
    path: '/edit/:id',
    name: 'EditMenuItem',
    component: EditMenuItemPage,
    props: true,
    meta: { requiresAuth: true }, // This route requires authentication
  },
  {
    path: '/create',
    name: 'CreateMenuItem',
    component: CreateMenuItemPage,
    meta: { requiresAuth: true }, // This route requires authentication
  },
  {
    path: '/',
    redirect: '/menu', // Default redirect to the menu page
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Check if the route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to login page if not authenticated
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
