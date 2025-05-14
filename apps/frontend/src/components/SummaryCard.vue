<template>
  <div
    :class="[
      'bg-white border border-gray-200 shadow-lg p-4 rounded-t-xl w-full',
      'mt-6',
      'fixed bottom-0 left-0 right-0 z-30 md:static md:rounded-xl md:shadow-sm md:mt-6 md:max-w-5xl md:mx-0',
      'mx-auto',
    ]"
    style="max-width: 100vw"
  >
    <div class="items-center gap-y-2 md:gap-x-6 md:gap-y-0 grid grid-cols-2 md:grid-cols-5">
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
        <span class="mt-0.5 text-gray-900 text-base">{{ recipientsWillReceive }}</span>
      </div>
      <div class="flex flex-col col-span-1">
        <span class="text-gray-500 text-xs">Total to pay</span>
        <span class="mt-0.5 text-gray-900 text-base">{{ totalToPay }}</span>
        <span class="mt-0.5 text-gray-400 text-xs">Includes fee: {{ fee }}</span>
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
defineProps<{
  totalToSend: string
  exchangeRate: string
  recipientsWillReceive: string
  totalToPay: string
  fee: string
}>()

defineEmits(['continue'])
</script>
