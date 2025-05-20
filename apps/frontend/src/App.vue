<script setup lang="ts">
import { RouterView } from 'vue-router'
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue'
</script>

<template>
  <TooltipProvider :delayDuration="300">
    <RouterView />
  </TooltipProvider>
</template>

<style scoped>
/* You can add global styles here if needed, or remove this style block */
</style>
