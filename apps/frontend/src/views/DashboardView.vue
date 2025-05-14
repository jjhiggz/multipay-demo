<template>
  <div class="bg-gray-100 p-8 min-h-screen">
    <header class="mb-12">
      <h1 class="font-bold text-gray-800 text-4xl">Welcome to Your Dashboard</h1>
      <p class="mt-2 text-gray-600 text-lg">Manage your account and access features quickly.</p>
    </header>

    <section class="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
      <!-- Multi-Pay Link Card -->
      <div class="bg-white shadow-lg hover:shadow-xl p-6 rounded-xl transition-shadow duration-300">
        <h2 class="mb-3 font-semibold text-gray-700 text-2xl">Multi-Pay Service</h2>
        <p class="mb-6 text-gray-600">
          Send funds to multiple recipients with ease using our Multi-Pay feature.
        </p>
        <router-link
          :to="{ name: 'dashboard-multi-pay' }"
          class="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-300"
        >
          Go to Multi-Pay
        </router-link>
      </div>

      <!-- Placeholder for other dashboard items -->
      <div class="bg-white shadow-lg p-6 rounded-xl">
        <h2 class="mb-3 font-semibold text-gray-700 text-2xl">Another Feature</h2>
        <p class="text-gray-600">Details about another dashboard feature...</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Dashboard specific logic can be added here if needed in the future
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
