<template>
  <div :class="['better-scroll-div', $attrs.class]" v-bind="attrsWithoutClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useAttrs, computed } from 'vue'

const $attrs = useAttrs()
const attrsWithoutClass = computed(() => {
  const { class: _class, ...rest } = $attrs
  return rest
})
</script>

<style scoped>
.better-scroll-div {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
}
.better-scroll-div::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background: transparent;
}
.better-scroll-div:hover::-webkit-scrollbar,
.better-scroll-div:active::-webkit-scrollbar,
.better-scroll-div:focus::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background: transparent;
}
.better-scroll-div::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}
</style>
