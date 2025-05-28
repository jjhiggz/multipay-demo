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
          <slot name="display" :option="props.modelValue" :open="open">
            {{ selectedLabel }}
          </slot>
        </span>
      </button>
    </slot>
    <transition name="fade">
      <div
        v-if="open"
        :class="[menuClassComputed, 'max-h-60 flex flex-col']"
        :style="menuStyle"
        ref="menuRef"
        role="listbox"
        tabindex="-1"
      >
        <div class="top-0 z-10 sticky flex-shrink-0 bg-white">
          <div class="py-1 pt-1 pb-0">
            <div
              data-slot="command-input-wrapper"
              class="flex items-center gap-2 px-3 border-gray-100 border-b h-9"
            >
              <svg
                class="opacity-50 size-4 shrink-0"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"
                  stroke-linecap="round"
                />
              </svg>
              <input
                type="text"
                class="flex bg-transparent disabled:opacity-50 placeholder:opacity-50 py-1 border-0 rounded-md outline-none w-full placeholder:text-muted-foreground text-sm disabled:cursor-not-allowed"
                placeholder="Search..."
                v-model="searchValue"
                @input="onSearch"
                :disabled="
                  disabled ||
                  (options.length === 0 && !$slots['no-options']) ||
                  (options.length === 0 && !!$slots['no-options'])
                "
              />
            </div>
          </div>
        </div>
        <div class="flex-1 overflow-y-auto custom-scrollbar">
          <ul v-if="options.length > 0">
            <li
              v-for="(option, idx) in options"
              :key="option.value"
              :ref="(el) => setOptionRef(el, idx)"
              :class="[
                itemClassComputed(option),
                {
                  'bg-gray-100 text-gray-900':
                    idx === activeIndex && option.value !== modelValue?.value,
                  'bg-blue-50 border border-blue-100':
                    option.value === modelValue?.value,
                },
              ]"
              role="option"
              :aria-selected="option.value === modelValue?.value"
              @click="select(option)"
              @keydown.enter.prevent="select(option)"
              tabindex="0"
            >
              <div class="flex justify-between items-center w-full">
                <div
                  :class="{ 'font-medium': option.value === modelValue?.value }"
                >
                  <slot
                    name="option"
                    :option="option"
                    :selected="option.value === modelValue?.value"
                  >
                    {{ option.label }}
                  </slot>
                </div>
                <svg
                  v-if="option.value === modelValue?.value"
                  class="flex-shrink-0 ml-2 w-4 h-4 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm-2 20L7 15l1.4-1.4L14 19.2l9.6-9.6L25 11l-11 11z"
                  />
                </svg>
              </div>
            </li>
          </ul>
          <div v-else class="p-4 text-muted-foreground text-sm text-center">
            <slot name="no-options"> No options available. </slot>
          </div>
        </div>
        <div
          v-if="$slots.footer"
          class="bottom-0 z-10 sticky flex-shrink-0 bg-white px-2 py-2 border-gray-100 border-t"
        >
          <slot name="footer" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script
  lang="ts"
  setup
  generic="T extends { label: string; value: string | number }"
>
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
 *   - footer: Custom footer always visible at the bottom of the dropdown menu.
 *   - no-options: Content to display when the options array is empty.
 */
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import {
  dropdownVariants,
  triggerVariants,
  menuVariants,
  itemVariants,
} from './dropdownVariants'

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
const menuClassComputed = computed(() => [
  menuVariants(props.variant),
  props.menuClass,
])
const itemClassComputed = (option: OptionType) => [
  itemVariants(
    props.variant,
    option.value === (props.modelValue?.value ?? props.modelValue),
  ),
  props.itemClass,
]

const menuStyle = computed(() =>
  menuWidth.value ? { minWidth: menuWidth.value } : {},
)

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

const activeIndex = ref<number>(-1)
const optionRefs = ref<(HTMLElement | null)[]>([])

function setOptionRef(el: Element | { $el?: Element } | null, idx: number) {
  // If el is a Vue component instance, use its $el
  const domEl = el && (el as any).$el ? (el as any).$el : el
  optionRefs.value[idx] = domEl instanceof HTMLElement ? domEl : null
}

function moveActiveIndex(delta: number) {
  if (!open.value || !props.options.length) return
  let next = activeIndex.value + delta
  if (next < 0) next = props.options.length - 1
  if (next >= props.options.length) next = 0
  activeIndex.value = next
  scrollActiveOptionIntoView()
}

function scrollActiveOptionIntoView() {
  nextTick(() => {
    const el = optionRefs.value[activeIndex.value]
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ block: 'nearest' })
    }
  })
}

watch(open, (val) => {
  if (val) {
    // Set activeIndex to selected or first option
    const selectedIdx = props.options.findIndex(
      (opt) => opt.value === (props.modelValue?.value ?? props.modelValue),
    )
    activeIndex.value = selectedIdx >= 0 ? selectedIdx : 0
    nextTick(() => scrollActiveOptionIntoView())
  }
})

const onKeydown = (e: KeyboardEvent) => {
  if (!open.value) return
  if (e.key === 'Escape') {
    open.value = false
    emit('search-closed')
    e.stopPropagation()
    e.preventDefault()
  } else if (e.key === 'ArrowDown') {
    moveActiveIndex(1)
    e.preventDefault()
  } else if (e.key === 'ArrowUp') {
    moveActiveIndex(-1)
    e.preventDefault()
  } else if (e.key === 'Enter') {
    if (activeIndex.value >= 0 && activeIndex.value < props.options.length) {
      select(props.options[activeIndex.value])
      e.preventDefault()
    }
  }
}

const isBorderless = computed(() => props.variant === 'borderless')

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

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-gutter: stable overlay;
  --scrollbar-opacity: 0;
  transition: --scrollbar-opacity 0.3s;
}
.custom-scrollbar:hover,
.custom-scrollbar:focus,
.custom-scrollbar:active,
.custom-scrollbar:scrolling {
  --scrollbar-opacity: 1;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  opacity: var(--scrollbar-opacity);
  transition: opacity 0.3s;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb,
.custom-scrollbar:focus::-webkit-scrollbar-thumb,
.custom-scrollbar:active::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.18);
  opacity: 1;
}
</style>
