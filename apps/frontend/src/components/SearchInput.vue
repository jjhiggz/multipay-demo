<template>
  <div class="relative" ref="rootRef">
    <input
      :class="['search-input', inputClass]"
      :placeholder="placeholder"
      v-model="inputValue"
      @focus="open = true"
      @input="onInput"
      @keydown="onKeydown"
      :disabled="disabled"
      ref="inputRef"
      autocomplete="off"
    />
    <transition name="fade">
      <BetterScrollDiv
        v-if="open && filteredOptions.length > 0"
        :class="[
          'absolute left-0 mt-1 w-full z-50 bg-white rounded shadow-lg border border-gray-200 overflow-y-scroll',
          menuClass,
        ]"
        ref="menuRef"
        role="listbox"
      >
        <ul>
          <li
            v-for="(option, idx) in filteredOptions"
            :key="option.value"
            :class="[
              'px-4 py-2 cursor-pointer select-none',
              idx === activeIndex ? 'bg-blue-50 text-blue-900' : '',
              option.value === modelValue?.value ? 'font-bold' : '',
              itemClass,
            ]"
            @mousedown.prevent="select(option)"
            role="option"
            :aria-selected="option.value === modelValue?.value"
          >
            <slot name="option" :option="option">
              {{ option.label }}
            </slot>
          </li>
        </ul>
        <div v-if="loading" class="px-4 py-2 text-gray-400 text-sm">Loading...</div>
      </BetterScrollDiv>
    </transition>
  </div>
</template>

<script setup lang="ts" generic="T extends { label: string; value: string | number }">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import BetterScrollDiv from './BetterScrollDiv.vue'

const props = defineProps<{
  modelValue: T | null
  options: T[]
  placeholder?: string
  loading?: boolean
  disabled?: boolean
  class?: string
  inputClass?: string
  menuClass?: string
  itemClass?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: T): void
  (e: 'search', value: string): void
}>()

const open = ref(false)
const inputValue = ref('')
const rootRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
const activeIndex = ref(-1)

const filteredOptions = computed(() => {
  if (!inputValue.value) return props.options
  return props.options.filter((opt) =>
    opt.label.toLowerCase().includes(inputValue.value.toLowerCase()),
  )
})

watch(
  () => props.modelValue,
  (val) => {
    if (val) inputValue.value = val.label
  },
  { immediate: true },
)

const onInput = (e: Event) => {
  emit('search', inputValue.value)
  open.value = true
  activeIndex.value = 0
}

const select = (option: T) => {
  emit('update:modelValue', option)
  inputValue.value = option.label
  open.value = false
}

const onKeydown = (e: KeyboardEvent) => {
  if (!open.value) return
  if (e.key === 'ArrowDown') {
    activeIndex.value = (activeIndex.value + 1) % filteredOptions.value.length
    e.preventDefault()
  } else if (e.key === 'ArrowUp') {
    activeIndex.value =
      (activeIndex.value - 1 + filteredOptions.value.length) % filteredOptions.value.length
    e.preventDefault()
  } else if (e.key === 'Enter') {
    if (activeIndex.value >= 0 && activeIndex.value < filteredOptions.value.length) {
      select(filteredOptions.value[activeIndex.value])
      e.preventDefault()
    }
  } else if (e.key === 'Escape') {
    open.value = false
    e.preventDefault()
  }
}

// Close on click outside
const onClickOutside = (e: MouseEvent) => {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => {
  // No need to add event listeners for menu positioning
})
onBeforeUnmount(() => {
  // No need to remove event listeners
})
</script>

<style scoped>
.search-input {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}
.search-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px #bfdbfe;
}
</style>
