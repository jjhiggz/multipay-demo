<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import Flag from '@/components/Flag.vue'
import { type CurrencyCode } from '@/constants/from-api/currency.constants'

const props = defineProps<{
  modelValue: string | number
  currency: CurrencyCode
  disabled?: boolean
  class?: string
  shouldShowFlag?: boolean
  shouldShowCurrency?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'update:currency', value: CurrencyCode): void
}>()

const showFlag = computed(() => true)
const showCurrency = computed(() =>
  props.shouldShowCurrency !== undefined ? props.shouldShowCurrency : true,
)

function handleInput(e: Event) {
  let val = (e.target as HTMLInputElement)?.value || ''
  // Only allow digits and a single decimal point
  val = val.replace(/[^\d.]/g, '')
  const parts = val.split('.')
  if (parts.length > 2) {
    val = parts[0] + '.' + parts.slice(1).join('')
  }
  emit('update:modelValue', val)
}
</script>

<template>
  <div :class="cn('relative flex items-center', props.class)">
    <input
      :value="props.modelValue"
      @input="handleInput"
      :disabled="props.disabled"
      type="text"
      inputmode="decimal"
      autocomplete="off"
      spellcheck="false"
      :class="
        cn(
          'flex-1 bg-background file:bg-transparent disabled:opacity-50 px-3 py-2 border border-input file:border-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 w-full h-10 file:font-medium placeholder:text-muted-foreground file:text-foreground md:text-sm file:text-sm text-base disabled:cursor-not-allowed pr-16 text-right',
          showFlag || showCurrency ? 'pr-16' : '',
        )
      "
      placeholder="0.00"
    />
    <span
      v-if="showFlag || showCurrency"
      class="right-4 z-10 absolute flex items-center gap-1 pointer-events-none select-none"
    >
      <Flag v-if="showFlag" :currency-code="props.currency" class="shrink-0" />
      <span v-if="showCurrency" class="font-medium text-sm">{{ props.currency }}</span>
    </span>
  </div>
</template>
