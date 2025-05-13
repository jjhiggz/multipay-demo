<template>
  <button
    ref="setTriggerRef"
    type="button"
    :aria-haspopup="'menu'"
    :aria-expanded="dropdownMenu.isOpen.value"
    @click="dropdownMenu.toggleMenu()"
    class="inline-flex items-center gap-2 bg-white hover:bg-gray-50 px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-100"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
const dropdownMenu = inject('dropdownMenu') as any

function setTriggerRef(el: HTMLElement | null) {
  if (dropdownMenu) dropdownMenu.triggerRef.value = el
}
</script>
