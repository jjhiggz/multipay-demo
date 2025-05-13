<template>
  <div :class="rootClass" ref="rootRef">
    <slot name="trigger">
      <button
        :class="triggerClass + ' flex items-center justify-between w-full'"
        @click="toggle"
        :disabled="disabled"
        type="button"
        aria-haspopup="listbox"
        :aria-expanded="open"
        ref="triggerRef"
      >
        <span class="flex-1 text-left">{{ selectedLabel }}</span>
        <svg
          class="ml-2 w-4 h-4 transition-transform duration-200"
          :class="{ 'rotate-180': open }"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </slot>
    <transition name="fade">
      <ul
        v-if="open"
        :class="menuClassComputed"
        :style="menuStyle"
        ref="menuRef"
        role="listbox"
        tabindex="-1"
      >
        <li
          v-for="option in options"
          :key="option.value"
          :class="itemClassComputed(option)"
          role="option"
          :aria-selected="option.value === modelValue"
          @click="select(option.value)"
          @keydown.enter.prevent="select(option.value)"
          tabindex="0"
        >
          <slot name="option" :option="option">
            {{ option.label }}
          </slot>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { dropdownVariants, triggerVariants, menuVariants, itemVariants } from './dropdownVariants'

interface Option {
  label: string
  value: string | number
}

const props = defineProps<{
  modelValue: string | number | null
  options: Option[]
  variant?: string
  class?: string
  menuClass?: string
  itemClass?: string
  disabled?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const menuWidth = ref<string | null>(null)

const selectedLabel = computed(() => {
  const found = props.options.find((opt) => opt.value === props.modelValue)
  return found ? found.label : 'Select...'
})

const rootClass = computed(() => [dropdownVariants(props.variant), props.class])
const triggerClass = computed(() => [triggerVariants(props.variant)])
const menuClassComputed = computed(() => [menuVariants(props.variant), props.menuClass])
const itemClassComputed = (option: Option) => [
  itemVariants(props.variant, option.value === props.modelValue),
  props.itemClass,
]

const menuStyle = computed(() => (menuWidth.value ? { minWidth: menuWidth.value } : {}))

const updateMenuWidth = () => {
  if (triggerRef.value) {
    menuWidth.value = triggerRef.value.offsetWidth + 'px'
  }
}

const toggle = async () => {
  if (props.disabled) return
  open.value = !open.value
  if (open.value) {
    await nextTick()
    updateMenuWidth()
  }
}

const select = (value: string | number) => {
  emit('update:modelValue', value)
  open.value = false
}

const onClickOutside = (e: MouseEvent) => {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

watch(open, (val) => {
  if (val) updateMenuWidth()
})

onMounted(() => {
  document.addEventListener('mousedown', onClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onClickOutside)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.rotate-180 {
  transform: rotate(180deg);
}
</style>
