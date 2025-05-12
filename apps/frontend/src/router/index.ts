import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useCurrentUser } from '../composables/useAuth'
// VueQueryPlugin, QueryClient, etc. are not directly needed here anymore for the guard logic itself
// if useCurrentUser correctly reflects the global query state.

// Define routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/multi-pay',
    name: 'multi-pay',
    component: () => import('../views/MultiPayView.vue'),
  },
  {
    path: '/james-multi',
    name: 'james-multi',
    component: () => import('../views/JamesMultiPayView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  // useCurrentUser() will provide reactive state based on TanStack Query's cache,
  // which is populated/updated by its usage in App.vue (and potentially other places).
  const { isAuthenticated, isLoading, user, refetchCurrentUser } = useCurrentUser()

  // If navigating to an auth-required route and user is not yet loaded (e.g. first load, page refresh straight to dashboard)
  // we might need to ensure the query has attempted to resolve.
  // TanStack Query typically handles initial fetch. If `isLoading` is true, it means it's fetching.
  // If not loading and user is null/undefined, an explicit fetch might have already failed or not run.

  if (isLoading.value) {
    // If user data is loading, wait for it to resolve before making a decision
    // This requires a mechanism to await query resolution or subscribe to its state change.
    // A common pattern is to use a watcher or await the refetch if triggered manually.
    // For simplicity here, we can try to await a refetch if the user is not yet defined.
    // This isn't perfect as `isLoading` might be true for background refetches.
    // A more robust solution would involve `queryClient.fetchQuery` or a dedicated loading state for initial auth check.
    // For now, we rely on `useCurrentUser` being called in App.vue to initiate loading.
    // If still loading here, we can let it pass and check isAuthenticated once loading is false.
    // Or, more simply, if routing to protected, and not authenticated and still loading, we can redirect to a temp loading page or wait.
    // This part can be tricky. Let's assume isLoading will eventually turn false.
  }

  // Attempt to ensure user is loaded if not already and not currently loading
  // This condition tries to fetch if `user.value` is still in its initial undefined state
  // and no fetch is in progress. This is a fallback for direct navigation scenarios.
  if (user.value === undefined && !isLoading.value && to.meta.requiresAuth) {
    try {
      await refetchCurrentUser() // Attempt to fetch the user
    } catch (error) {
      console.error('Router guard: refetchCurrentUser failed', error)
      // If fetching fails, isAuthenticated should remain false or user null
    }
  }

  // Final decision based on potentially updated isAuthenticated state
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.meta.requiresGuest && isAuthenticated.value) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
