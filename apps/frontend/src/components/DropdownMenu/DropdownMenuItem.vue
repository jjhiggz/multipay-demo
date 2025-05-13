<template>
  <div
    class="hover:bg-gray-100 focus:bg-gray-100 px-3 py-2 focus:outline-none cursor-pointer select-none"
    role="menuitem"
    tabindex="0"
    @click="onSelect"
    @keydown.enter.prevent="onSelect"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['select'])
const onSelect = () => emit('select')
</script>
