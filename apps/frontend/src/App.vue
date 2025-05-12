<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useCurrentUser } from './composables/useAuth'

// Initialize and subscribe to current user state at the app root
const { user, isLoading, isAuthenticated, error } = useCurrentUser()

// You can watch `user` or `isAuthenticated` here if needed for app-level reactions,
// or provide them to children via provide/inject if not using a global state solution for these specific values.
// For now, just calling useCurrentUser() ensures the query is active and cached.
</script>

<template>
  <RouterView />
</template>

<style scoped>
/* You can add global styles here if needed, or remove this style block */
</style>
