<template>
  <div class="relative">
    <!-- Profile Panel Trigger -->
    <div
      @click="toggleDropdown"
      class="flex items-center bg-white shadow-sm px-4 py-2 rounded-xl cursor-pointer"
    >
      <!-- Loading/Error states -->
      <div v-if="isSessionLoading || isOrgLoadingHint" class="px-4 py-2 text-gray-500">
        Loading...
      </div>
      <div v-else-if="sessionError || orgErrorHint" class="px-4 py-2 text-red-500">Error</div>
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
import { ref, computed, watchEffect } from 'vue'
// Removed PropType as props are being removed
import { useRouter } from 'vue-router'
import { authClient } from '../services/authClient'

const router = useRouter()
const isOpen = ref(false)

// Use hooks directly within the component
const sessionState = authClient.useSession()
const activeOrgStateAtom = authClient.useActiveOrganization()

// --- Reactive Computeds from sessionState ---
const isSessionLoading = computed(() => sessionState.value?.isPending)
// Assuming sessionState.value might contain an error property if fetching fails
const sessionError = computed(() => sessionState.value?.error)
const currentUser = computed(() => sessionState.value?.data?.user)

// --- Reactive Computeds/State from activeOrgStateAtom ---
// activeOrgStateAtom is now the Ref itself.
const activeOrganization = computed(() => activeOrgStateAtom.value?.data)

// Placeholder hints for org loading/error - ideally useActiveOrganization provides these
const isOrgLoadingHint = computed(() => isSessionLoading.value) // Org data depends on session
const orgErrorHint = computed(() => sessionError.value) // If session fails, org will too

const orgName = computed(() => {
  const name = activeOrganization.value?.name
  return typeof name === 'string' ? name : 'Organization unavailable'
})

const userName = computed(() => {
  return currentUser.value?.name || currentUser.value?.email || 'User unavailable'
})

const toggleDropdown = () => {
  if (!isSessionLoading.value && !sessionError.value) {
    isOpen.value = !isOpen.value
  }
}

const handleLogout = async () => {
  isOpen.value = false
  try {
    await authClient.signOut()
    router.push({ name: 'home' })
  } catch (error) {
    console.error('Logout failed:', error)
    alert('Logout failed. Please try again.')
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
