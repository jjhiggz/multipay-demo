<template>
  <div class="bg-white shadow mt-6 p-6 rounded-lg w-full max-w-5xl">
    <div class="flex md:flex-row flex-col md:justify-between md:items-center gap-6">
      <!-- Summary Items -->
      <div class="flex md:flex-row flex-col flex-1 md:items-center md:gap-12">
        <div class="flex flex-col mb-4 md:mb-0">
          <span class="mb-1 text-gray-600 text-xs md:text-sm">Total to send</span>
          <span class="font-bold text-lg md:text-xl">{{ totalToSend }}</span>
        </div>
        <div class="flex flex-col mb-4 md:mb-0">
          <span class="mb-1 text-gray-600 text-xs md:text-sm">Exchange rate</span>
          <span class="font-bold text-lg md:text-xl">{{ exchangeRate }}</span>
        </div>
        <div class="flex flex-col mb-4 md:mb-0">
          <span class="mb-1 text-gray-600 text-xs md:text-sm">Recipients will receive</span>
          <span class="font-bold text-lg md:text-xl">{{ recipientsWillReceive }}</span>
        </div>
        <div class="flex flex-col">
          <span class="mb-1 text-gray-600 text-xs md:text-sm">Total to pay</span>
          <span class="font-bold text-lg md:text-xl">{{ totalToPay }}</span>
          <span class="mt-1 text-gray-400 text-xs md:text-sm">Includes fee: {{ fee }}</span>
        </div>
      </div>
      <!-- Continue Button -->
      <button
        class="flex justify-center items-center self-center gap-2 bg-black hover:bg-gray-900 py-4 rounded-lg w-full md:w-72 font-medium text-white text-lg transition"
        style="min-width: 200px"
        @click="$emit('continue')"
      >
        Continue
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ml-2 w-5 h-5"
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
