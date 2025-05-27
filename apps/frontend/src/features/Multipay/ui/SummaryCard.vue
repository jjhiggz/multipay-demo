<template>
  <div
    :class="[
      'bg-white border border-gray-200 p-4 rounded-t-xl w-full',
      'mt-6',
      'sticky bottom-0 z-50',
      'mx-auto md:max-w-5xl',
    ]"
    style="max-width: 100vw"
    role="region"
    aria-label="Transfer summary"
  >
    <div class="items-start gap-y-2 md:gap-x-6 md:gap-y-0 grid grid-cols-2 md:grid-cols-5">
      <div class="flex flex-col col-span-1">
        <span class="text-gray-500 text-xs">Total to send</span>
        <span class="mt-0.5 text-gray-700 font-medium text-base">{{ totalToSend }}</span>
      </div>
      <div class="flex flex-col col-span-1">
        <span class="text-gray-500 text-xs">Exchange rate</span>
        <span class="mt-0.5 text-gray-700 text-base font-medium">{{ exchangeRate }}</span>
      </div>
      <div class="flex flex-col col-span-1">
        <span class="text-gray-500 text-xs">Recipients will receive</span>
        <span class="mt-0.5 text-gray-700 text-base font-medium">{{ recipientsWillReceive }}</span>
      </div>
      <div class="flex flex-col col-span-1">
        <span class="text-gray-500 text-xs">Total to pay</span>
        <span class="mt-0.5 text-gray-700 font-bold text-base">{{ totalToPay }}</span>
        <span class="mt-0.5 text-gray-400 text-xs">Includes fee: {{ fee }}</span>
      </div>
      <div class="flex md:justify-end col-span-2 md:col-span-1 mt-2 md:mt-0">
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
import Button from '@/components/ui/button/Button.vue'
/**
 * SummaryCardProps defines the props for the SummaryCard component.
 * All props are required for clarity and type safety.
 */
export interface SummaryCardProps {
  totalToSend: string
  exchangeRate: string
  recipientsWillReceive: string
  totalToPay: string
  fee: string
  isLoading?: boolean
  isDisabled?: boolean
  buttonAriaLabel?: string
}

const props = withDefaults(defineProps<SummaryCardProps>(), {
  isLoading: false,
  isDisabled: false,
  buttonAriaLabel: 'Continue to payment',
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
