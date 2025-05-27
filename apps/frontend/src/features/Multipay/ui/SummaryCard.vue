<template>
  <div
    :class="[
      'bg-white border border-gray-200 shadow-lg p-4 rounded-t-xl w-full',
      'mt-6',
      'sticky bottom-0 z-10',
      'mx-auto md:max-w-5xl',
    ]"
    style="max-width: 100vw"
  >
    <div
      class="items-center gap-y-2 md:gap-x-6 md:gap-y-0 grid grid-cols-2 md:grid-cols-5"
    >
      <div class="flex flex-col col-span-1">
        <span class="text-gray-500 text-xs">Total to send</span>
        <span class="mt-0.5 text-gray-900 text-base">{{ totalToSend }}</span>
      </div>
      <div class="flex flex-col col-span-1">
        <span class="text-gray-500 text-xs">Exchange rate</span>
        <span class="mt-0.5 text-gray-900 text-base">{{ exchangeRate }}</span>
      </div>
      <div class="flex flex-col col-span-1">
        <span class="text-gray-500 text-xs">Recipients will receive</span>
        <span class="mt-0.5 text-gray-900 text-base">{{
          recipientsWillReceive
        }}</span>
      </div>
      <div class="flex flex-col col-span-1">
        <span class="text-gray-500 text-xs">Total to pay</span>
        <span class="mt-0.5 text-gray-900 text-base">{{ totalToPay }}</span>
        <span class="mt-0.5 text-gray-400 text-xs"
          >Includes fee: {{ fee }}</span
        >
      </div>
      <div class="flex md:justify-end col-span-2 md:col-span-1 mt-2 md:mt-0">
        <button
          class="flex justify-center items-center gap-2 bg-black hover:bg-gray-900 px-5 py-2 rounded-md w-full md:w-auto font-medium text-white text-sm transition"
          @click="$emit('continue')"
        >
          Continue
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ml-1 w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FEQuote } from '../domain/useGetQuote'

const props = defineProps<{
  quote: FEQuote | undefined
  isLoading: boolean
}>()

const totalToSend = computed(() => {
  if (props.isLoading) return 'Loading...'
  if (!props.quote) return ''
  const defaultQuote = props.quote.individualQuotes[0]
  console.log({ defaultQuote: JSON.parse(JSON.stringify(defaultQuote)) })
  return `${defaultQuote.sellAmount} ${props.quote.sellCcy}`
})

const exchangeRate = computed(() => {
  if (props.isLoading) return 'Loading...'
  if (!props.quote) return ''
  const defaultQuote = props.quote.individualQuotes[0]
  const rateValue = parseFloat(String(defaultQuote.rate))
  if (Number.isNaN(rateValue)) {
    // Handle cases where rate might not be a valid number
    // You might want to return a specific error message or an empty string
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

defineEmits(['continue'])
</script>
