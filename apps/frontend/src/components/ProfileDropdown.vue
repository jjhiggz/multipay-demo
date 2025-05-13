<template>
  <div class="relative">
    <!-- Profile Panel Trigger -->
    <div
      @click="toggleDropdown"
      class="flex items-center bg-white shadow-sm px-4 py-2 rounded-xl cursor-pointer"
    >
      <!-- Loading/Error states -->
      <div v-if="isLoading" class="px-4 py-2 text-gray-500">Loading...</div>
      <div v-else-if="error" class="px-4 py-2 text-red-500">Error</div>
      <template v-else-if="currentUser || activeOrganization">
        <!-- User Icon -->
        <div
          class="flex flex-shrink-0 justify-center items-center bg-gray-100 mr-4 rounded-lg w-12 h-12"
        >
          <svg
            class="w-7 h-7 text-gray-400"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          </svg>
        </div>
        <!-- Org/User Info -->
        <div class="flex flex-col justify-center overflow-hidden">
          <span class="font-semibold text-gray-900 text-lg truncate leading-tight" :title="orgName">
            {{ orgName }}
          </span>
          <span class="text-gray-500 text-base truncate leading-tight" :title="userName">
            {{ userName }}
          </span>
        </div>
        <!-- Chevron Icon -->
        <svg
          class="flex-shrink-0 ml-4 w-6 h-6 text-gray-400 transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </template>
      <div v-else class="px-4 py-2 text-gray-500">Profile unavailable</div>
    </div>

    <!-- Dropdown Menu -->
    <transition name="dropdown-fade">
      <div v-if="isOpen" class="right-0 z-20 absolute bg-white shadow-xl mt-2 py-1 rounded-md w-48">
        <button
          @click="handleLogout"
          class="block hover:bg-red-500 px-4 py-2 w-full text-gray-700 hover:text-white text-sm text-left transition-colors"
        >
          Sign Out
        </button>
        <!-- Add other dropdown items here if needed -->
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// Import PropType as a type
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import { authClient } from '../services/authClient' // Adjust path if needed

// Define types for props for better clarity
interface User {
  id: string
  name?: string | null
  email?: string | null
}

interface Organization {
  id: string
  name: string
}

// Type for the session data expected from useAuthSession
interface SessionData {
  user: User | null | undefined
}

// Type for the organization state atom
interface OrgStateAtom {
  value:
    | {
        data: Organization | null | undefined
        // Potentially other atom properties like isLoading, error might exist
      }
    | null
    | undefined
}

const props = defineProps({
  // Pass loading/error states from the parent where hooks are called
  isLoading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Error as PropType<Error | null>,
    default: null,
  },
  // Pass the results of the composables
  sessionData: {
    type: Object as PropType<SessionData | null | undefined>,
    default: null,
  },
  activeOrganizationState: {
    type: Object as PropType<OrgStateAtom | null | undefined>,
    default: null,
  },
})

const router = useRouter()
const isOpen = ref(false)

// Use computed properties to safely access nested data
const currentUser = computed(() => props.sessionData?.user)
const activeOrganization = computed(() => props.activeOrganizationState?.value?.data)

const orgName = computed(() => {
  const name = activeOrganization.value?.name
  return typeof name === 'string' ? name : 'Organization unavailable'
})

const userName = computed(() => {
  return currentUser.value?.name || currentUser.value?.email || 'User unavailable'
})

const toggleDropdown = () => {
  // Only toggle if not loading and no error
  if (!props.isLoading && !props.error) {
    isOpen.value = !isOpen.value
  }
}

const handleLogout = async () => {
  isOpen.value = false // Close dropdown immediately
  try {
    await authClient.signOut() // Use the correct sign-out method
    // No need to manually invalidate queries usually, router guard handles redirect
    // and next page load should refetch session.
    router.push({ name: 'home' })
  } catch (error) {
    console.error('Logout failed:', error)
    alert('Logout failed. Please try again.')
    // Still attempt redirect even if sign out API fails, session might be invalid anyway
    router.push({ name: 'home' })
  }
}
</script>

<style scoped>
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition:
    opacity 0.1s ease-in-out,
    transform 0.1s ease-in-out;
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.dropdown-fade-enter-to,
.dropdown-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
