<template>
  <div :class="rootClass" ref="rootRef" @keydown="onKeydown" tabindex="0">
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
        <span class="flex flex-1 items-center gap-2 text-left">
          <slot name="display" :option="props.modelValue">
            {{ selectedLabel }}
          </slot>
        </span>
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
        <li class="top-0 z-10 sticky bg-white px-2 pt-2 pb-1">
          <div class="relative flex items-center">
            <span class="left-2 absolute text-gray-400">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke-linecap="round" />
              </svg>
            </span>
            <input
              type="text"
              class="py-1 pr-2 pl-7 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-100 w-full text-sm"
              placeholder="Search..."
              v-model="searchValue"
              @input="onSearch"
            />
          </div>
        </li>
        <li
          v-for="option in options"
          :key="option.value"
          :class="itemClassComputed(option)"
          role="option"
          :aria-selected="option.value === modelValue?.value"
          @click="select(option)"
          @keydown.enter.prevent="select(option)"
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

<script lang="ts" setup generic="T extends { label: string; value: string | number }">
/**
 * Generic Dropdown component.
 *
 * @template T - Option type, must have at least { label: string; value: string | number }
 * Usage: <Dropdown<OptionType> ... />
 *
 * Slots:
 *   - display: Custom render for the trigger content (next to chevron). Receives { option } (the selected option).
 *   - option: Custom render for each dropdown option. Receives { option }.
 *   - trigger: Full custom trigger (overrides chevron and all content).
 */
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { dropdownVariants, triggerVariants, menuVariants, itemVariants } from './dropdownVariants'

export interface BaseDropdownOption {
  label: string
  value: string | number
}

type OptionType = T extends BaseDropdownOption ? T : BaseDropdownOption

const props = defineProps<{
  modelValue: OptionType | null
  options: OptionType[]
  variant?: string
  class?: string
  menuClass?: string
  itemClass?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: OptionType): void
  (e: 'search', value: string): void
  (e: 'search-closed'): void
}>()

const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const menuWidth = ref<string | null>(null)
const searchValue = ref('')

const selectedLabel = computed(() => {
  const found = props.options.find(
    (opt) => opt.value === (props.modelValue?.value ?? props.modelValue),
  )
  return found ? found.label : 'Select...'
})

const rootClass = computed(() => [dropdownVariants(props.variant), props.class])
const triggerClass = computed(() => [triggerVariants(props.variant)])
const menuClassComputed = computed(() => [menuVariants(props.variant), props.menuClass])
const itemClassComputed = (option: OptionType) => [
  itemVariants(props.variant, option.value === (props.modelValue?.value ?? props.modelValue)),
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
  if (open.value) {
    open.value = false
    emit('search-closed')
    return
  }
  open.value = true
  await nextTick()
  updateMenuWidth()
}

const select = (value: OptionType) => {
  emit('update:modelValue', value)
  open.value = false
  emit('search-closed')
}

const onClickOutside = (e: MouseEvent) => {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
    open.value = false
    emit('search-closed')
  }
}

const onSearch = () => {
  emit('search', searchValue.value)
}

const onKeydown = (e: KeyboardEvent) => {
  if (!open.value) return
  if (e.key === 'Escape') {
    open.value = false
    emit('search-closed')
    e.stopPropagation()
    e.preventDefault()
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
