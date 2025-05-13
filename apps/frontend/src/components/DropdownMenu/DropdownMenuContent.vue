<template>
  <div
    v-if="dropdownMenu.isOpen.value"
    ref="setContentRef"
    class="z-50 absolute bg-white shadow-lg mt-2 border border-gray-200 rounded focus:outline-none min-w-[10rem]"
    tabindex="-1"
    role="menu"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
const dropdownMenu = inject('dropdownMenu') as any

function setContentRef(el: HTMLElement | null) {
  if (dropdownMenu) dropdownMenu.contentRef.value = el
}
</script>
