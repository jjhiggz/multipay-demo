import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { authClient } from '@/services/authClient'
// VueQueryPlugin, QueryClient, etc. are not directly needed here anymore for the guard logic itself
// if useCurrentUser correctly reflects the global query state.

// Define routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresGuest: true },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { requiresAuth: true },
    redirect: { name: 'dashboard-overview' },
    children: [
      {
        path: 'overview',
        name: 'dashboard-overview',
        component: () => import('../views/DashboardView.vue'),
      },
      {
        path: 'multi-pay',
        name: 'dashboard-multi-pay',
        component: () => import('../features/multi-pay-page.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const user = (await authClient.getSession()).data?.user

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest)

  if (requiresAuth && !user) {
    // Redirect unauthenticated users trying to access protected routes to login
    console.log('Guard: Redirecting to home (requires auth, not authenticated)')
    next({ name: 'home' })
  } else if (requiresGuest && user) {
    // Redirect authenticated users trying to access guest-only routes to dashboard
    console.log('Guard: Redirecting to dashboard (requires guest, authenticated)')
    next({ name: 'dashboard' })
  } else {
    // Otherwise, allow navigation
    next()
  }
})

export default router
