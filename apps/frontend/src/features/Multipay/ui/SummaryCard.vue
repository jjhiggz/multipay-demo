<template>
  <div
    :class="[
      'bg-white border border-gray-200 p-4 rounded-t-xl w-full',
      'mt-6',
    ]"
    style="max-width: 100vw"
    role="region"
    aria-label="Transfer summary"
  >
    <div
      class="items-start gap-y-2 md:gap-x-6 md:gap-y-0 grid grid-cols-2 md:grid-cols-5"
    >
      <div class="flex flex-col col-span-1">
        <span class="text-gray-500 text-xs">Total to send</span>
        <div v-if="props.isLoading" class="mt-0.5 h-6 flex items-center">
          <span class="h-4 bg-gray-200 rounded animate-pulse w-16"></span>
        </div>
        <span v-else class="mt-0.5 font-medium text-gray-700 text-base">{{
          totalToSend
        }}</span>
      </div>
      <div class="flex flex-col col-span-1">
        <span class="text-gray-500 text-xs">Exchange rate</span>
        <div v-if="props.isLoading" class="mt-0.5 h-6 flex items-center">
          <span class="h-4 bg-gray-200 rounded animate-pulse w-20"></span>
        </div>
        <span v-else class="mt-0.5 font-medium text-gray-700 text-base">{{
          exchangeRate
        }}</span>
      </div>
      <div class="flex flex-col col-span-1">
        <span class="text-gray-500 text-xs">Recipients will receive</span>
        <div v-if="props.isLoading" class="mt-0.5 h-6 flex items-center">
          <span class="h-4 bg-gray-200 rounded animate-pulse w-16"></span>
        </div>
        <span v-else class="mt-0.5 font-medium text-gray-700 text-base">{{
          recipientsWillReceive
        }}</span>
      </div>
      <div class="flex flex-col col-span-1">
        <span class="text-gray-500 text-xs">Total to pay</span>
        <div v-if="props.isLoading" class="mt-0.5 h-6 flex items-center">
          <span class="h-4 bg-gray-200 rounded animate-pulse w-20"></span>
        </div>
        <span v-else class="mt-0.5 font-bold text-gray-700 text-base">{{
          totalToPay
        }}</span>
        <div v-if="props.isLoading" class="mt-0.5 h-4 flex items-center">
          <span class="h-3 bg-gray-200 rounded animate-pulse w-12"></span>
        </div>
        <span v-else class="mt-0.5 text-gray-400 text-xs"
          >Includes fee: {{ fee }}</span
        >
      </div>
      <div class="flex justify-center md:justify-end col-span-2 md:col-span-1 mt-2 md:mt-0">
        <slot name="action">
          <Button
            variant="default"
            class="w-full md:w-full !font-bold"
            :aria-label="buttonAriaLabel"
            :disabled="isLoading || isDisabled"
            @click="$emit('continue')"
          >
            <span v-if="isLoading" class="animate-pulse">Loading...</span>
            <span v-else class="!font-medium">Continue</span>
          </Button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from '@/components/ui/button/Button.vue'
import type { FEQuote } from '../domain/useGetQuote'

/**
 * SummaryCardProps defines the props for the SummaryCard component.
 * All props are required for clarity and type safety.
 */
export interface SummaryCardProps {
  quote: FEQuote | undefined
  isLoading?: boolean
  isDisabled?: boolean
  buttonAriaLabel?: string
}

const props = withDefaults(defineProps<SummaryCardProps>(), {
  isLoading: false,
  isDisabled: false,
  buttonAriaLabel: 'Continue to payment',
})

const totalToSend = computed(() => {
  if (props.isLoading) return 'Loading...'
  if (!props.quote) return ''
  const defaultQuote = props.quote.individualQuotes[0]
  return `${defaultQuote.sellAmount} ${props.quote.sellCcy}`
})

const exchangeRate = computed(() => {
  if (props.isLoading) return 'Loading...'
  if (!props.quote) return ''
  const defaultQuote = props.quote.individualQuotes[0]
  const rateValue = parseFloat(String(defaultQuote.rate))
  if (Number.isNaN(rateValue)) {
    return `1 ${props.quote.sellCcy} = N/A ${props.quote.buyCcy}`
  }
  return `1 ${props.quote.sellCcy} = ${rateValue.toFixed(2)} ${props.quote.buyCcy}`
})

const recipientsWillReceive = computed(() => {
  if (props.isLoading) return 'Loading...'
  if (!props.quote) return ''
  const defaultQuote = props.quote.individualQuotes[0]
  return `${defaultQuote.buyAmount} ${props.quote.buyCcy}`
})

const totalToPay = computed(() => {
  if (props.isLoading) return 'Loading...'
  if (!props.quote) return ''
  const defaultQuote = props.quote.individualQuotes[0]
  return `${defaultQuote.totalCostAmount} ${props.quote.sellCcy}`
})

const fee = computed(() => {
  if (props.isLoading) return 'Loading...'
  if (!props.quote) return ''
  const defaultQuote = props.quote.individualQuotes[0]
  const totalFee =
    Number(defaultQuote.transferFee) + Number(defaultQuote.paymentMethodFee)
  return `${totalFee} ${props.quote.sellCcy}`
})

defineEmits<{ (e: 'continue'): void }>()
</script>

<!--
  SummaryCard.vue
  - A robust, accessible, and reusable summary card for payment/transfer flows.
  - Use the `action` slot to provide a custom button or actions if needed.
  - Emits: 'continue' when the default button is clicked.
  - Props: see SummaryCardProps above.
-->
