<template>
  <div class="flex flex-col bg-gray-50 min-h-screen">
    <!-- Header -->
    <header class="flex justify-between items-center bg-white px-8 py-4 border-gray-200 border-b">
      <div class="flex items-center gap-4">
        <img :src="logoUrl" alt="Logo" class="w-10 h-10" />
      </div>
      <ProfileDropdown />
    </header>
    <main class="flex flex-col flex-1 items-center px-4 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import logoUrl from '../assets/logo.svg'
import ProfileDropdown from '@/components/ProfileDropdown.vue'
</script>
