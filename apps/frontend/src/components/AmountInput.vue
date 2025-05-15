<template>
  <div class="relative w-full">
    <input
      ref="inputRef"
      :value="displayValue"
      :placeholder="placeholder || '0.00'"
      :disabled="disabled"
      class="py-2 pr-10 pl-3 border border-gray-300 focus:border-blue-500 rounded focus:ring-2 focus:ring-blue-100 w-full font-mono text-lg text-left amount-input"
      @input="onInput"
      @blur="onBlur"
      @keydown="onKeydown"
      @paste="onPaste"
      inputmode="decimal"
      autocomplete="off"
    />

    <span class="top-1/2 right-3 absolute -translate-y-1/2">
      <Flag :currency-code="currencyCode" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue'
import Flag from './Flag.vue'
import type { CurrencyCode } from '@/constants/from-api/currency.constants'

const props = defineProps<{
  modelValue: string | number | null
  currencyCode: CurrencyCode
  placeholder?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const rawValue = ref(props.modelValue ? String(props.modelValue) : '')

watch(
  () => props.modelValue,
  (val) => {
    if (val !== rawValue.value) rawValue.value = val ? String(val) : ''
  },
)

const displayValue = computed(() => formatMoney(rawValue.value))

function formatMoney(val: string): string {
  if (!val) return ''
  // Remove all non-numeric except dot
  let [int, dec] = val.replace(/[^\d.]/g, '').split('.')
  int = int.replace(/^0+(?!$)/, '') // Remove leading zeros
  int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  if (dec !== undefined) dec = dec.slice(0, 2)
  return dec !== undefined ? `${int}.${dec}` : int
}

function parseMoney(val: string): string {
  // Only allow valid money input
  let [int, dec] = val.replace(/[^\d.]/g, '').split('.')
  int = int.replace(/^0+(?!$)/, '')
  if (dec !== undefined) dec = dec.slice(0, 2)
  return dec !== undefined ? `${int}.${dec}` : int
}

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  let val = target.value
  // Remove invalid chars, format, and update
  val = parseMoney(val)
  rawValue.value = val
  emit('update:modelValue', val)
}

function onBlur() {
  // Format on blur
  rawValue.value = parseMoney(rawValue.value)
}

function onKeydown(e: KeyboardEvent) {
  // Allow: backspace, tab, left/right, delete, home/end, numbers, dot
  if (['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'].includes(e.key)) {
    return
  }
  // Only allow one dot
  if (e.key === '.' && rawValue.value.includes('.')) {
    e.preventDefault()
    return
  }
  // Only allow numbers and dot
  if (!/\d|\./.test(e.key)) {
    e.preventDefault()
    return
  }
  // Prevent more than 2 decimals
  const val = rawValue.value
  if (val.includes('.') && e.key !== 'Backspace') {
    const dec = val.split('.')[1] || ''
    if (dec.length >= 2) {
      e.preventDefault()
    }
  }
}

function onPaste(e: ClipboardEvent) {
  const text = e.clipboardData?.getData('text') || ''
  if (!/^\d*(\.\d{0,2})?$/.test(text.replace(/,/g, ''))) {
    e.preventDefault()
  }
}
</script>

<style scoped>
.amount-input {
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  background: white;
}
.amount-input:disabled {
  background: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
}
</style>
