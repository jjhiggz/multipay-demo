<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- Navbar -->
    <nav class="bg-indigo-600 shadow-lg">
      <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <!-- You can replace this with your logo -->
              <h1 class="font-bold text-white text-2xl">My App Dashboard</h1>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="flex items-center ml-4 md:ml-6">
              <span v-if="user" class="mr-3 text-indigo-100"
                >Welcome, {{ user.name || user.email }}!</span
              >
              <button
                @click="handleLogout"
                :disabled="isLogoutLoading"
                class="bg-indigo-700 hover:bg-indigo-500 disabled:opacity-50 ml-auto px-4 py-2 rounded focus:shadow-outline focus:outline-none font-bold text-white"
              >
                {{ isLogoutLoading ? 'Logging out...' : 'Log Out' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Page content -->
    <main class="py-10">
      <div class="mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="px-4 sm:px-0 py-8">
          <div class="bg-white shadow-xl p-8 rounded-lg">
            <h2 class="mb-6 font-semibold text-gray-800 text-2xl">Dashboard</h2>
            <div v-if="isLoadingUser && !user" class="text-center">
              <p class="text-gray-600 text-lg">Loading user data...</p>
              <!-- Optional: Add a spinner here -->
            </div>
            <div v-else-if="user">
              <h3 class="mb-4 font-medium text-gray-700 text-xl">User Information:</h3>
              <pre class="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm">{{
                JSON.stringify(user, null, 2)
              }}</pre>
            </div>
            <div v-else-if="userError">
              <p class="text-red-600">Could not load user data: {{ userError.message }}</p>
            </div>
            <div v-else>
              <p class="text-gray-600">You are not logged in or user data is unavailable.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCurrentUser, GET_CURRENT_USER_QUERY_KEY } from '../composables/useAuth'
import { useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'

const router = useRouter()
const queryClient = useQueryClient()

// Use the composable for current user state
const { user, isLoading: isLoadingUser, error: userError } = useCurrentUser()

const isLogoutLoading = ref(false)

const handleLogout = async () => {
  isLogoutLoading.value = true
  try {
    await fetch('/api/auth/sign-out', {
      // Assuming direct fetch for logout for now
      method: 'POST',
      credentials: 'include',
    })
    // After successful logout, invalidate the getCurrentUser query
    await queryClient.invalidateQueries({ queryKey: GET_CURRENT_USER_QUERY_KEY })
    // Optionally, reset queries to initial state or clear cache for user-specific data
    // await queryClient.resetQueries({ queryKey: GET_CURRENT_USER_QUERY_KEY });
    // user.value will become null due to refetch or cache reset
    router.push({ name: 'login' })
  } catch (err: any) {
    console.error('Logout error:', err)
    // Handle logout error (e.g., show a notification)
    // Even if API call fails, try to clear user locally by invalidating
    await queryClient.invalidateQueries({ queryKey: GET_CURRENT_USER_QUERY_KEY })
    router.push({ name: 'login' }) // Or handle more gracefully
  } finally {
    isLogoutLoading.value = false
  }
}

// No need for onMounted to fetch user, useCurrentUser and App.vue handle it.
</script>
