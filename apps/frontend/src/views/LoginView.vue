<template>
  <div class="flex justify-center items-center bg-gray-100 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
    <div class="space-y-8 bg-white shadow-xl p-10 rounded-lg w-full max-w-md">
      <div>
        <h2 class="mt-6 font-extrabold text-gray-900 text-3xl text-center">
          Sign in to your account
        </h2>
      </div>
      <form class="space-y-6 mt-8" @submit.prevent="handleLogin">
        <div
          v-if="error"
          class="relative bg-red-100 px-4 py-3 border border-red-400 rounded text-red-700"
          role="alert"
        >
          <strong class="font-bold">Error:</strong>
          <span class="block sm:inline">{{ error }}</span>
        </div>

        <div class="-space-y-px shadow-sm rounded-md">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="email"
              class="block focus:z-10 relative px-3 py-2 border border-gray-300 focus:border-indigo-500 rounded-none rounded-t-md focus:outline-none focus:ring-indigo-500 w-full text-gray-900 sm:text-sm appearance-none placeholder-gray-500"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="password"
              class="block focus:z-10 relative px-3 py-2 border border-gray-300 focus:border-indigo-500 rounded-none rounded-b-md focus:outline-none focus:ring-indigo-500 w-full text-gray-900 sm:text-sm appearance-none placeholder-gray-500"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative flex justify-center bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 px-4 py-2 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full font-medium text-white text-sm"
          >
            <span class="left-0 absolute inset-y-0 flex items-center pl-3">
              <svg
                class="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            {{ isLoading ? 'Signing in...' : 'Sign in' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authClient } from '../services/authClient'

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref<string | null>(null)
const router = useRouter()

const handleLogin = async () => {
  isLoading.value = true
  error.value = null
  try {
    const { error: authError } = await authClient.signIn.email({
      email: email.value,
      password: password.value,
    })
    if (authError) {
      throw new Error(authError.message || 'Login failed')
    }
    router.push({ name: 'dashboard' })
  } catch (err: any) {
    error.value = err.message || 'Login failed'
  } finally {
    isLoading.value = false
  }
}
</script>
