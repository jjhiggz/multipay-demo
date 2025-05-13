<template>
  <div ref="menuRoot" class="relative" @keydown="onKeydown">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'

const isOpen = ref(false)
const menuRoot = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

const openMenu = () => {
  isOpen.value = true
}
const closeMenu = () => {
  isOpen.value = false
}
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

provide('dropdownMenu', {
  isOpen,
  openMenu,
  closeMenu,
  toggleMenu,
  triggerRef,
  contentRef,
})

const onClickOutside = (e: MouseEvent) => {
  if (isOpen.value && menuRoot.value && !menuRoot.value.contains(e.target as Node)) {
    closeMenu()
  }
}

watch(isOpen, (val) => {
  if (val)
    nextTick(() => {
      contentRef.value?.focus?.()
    })
})

onMounted(() => {
  document.addEventListener('mousedown', onClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onClickOutside)
})

function onKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return
  if (e.key === 'Escape') {
    closeMenu()
    e.preventDefault()
  }
}
</script>
