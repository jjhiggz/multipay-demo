<template>
  <IsolatedPageLayout>
    <div class="flex justify-start items-center mb-2 w-full">
      <h1 class="font-semibold text-2xl">Multiple Recipients</h1>
    </div>

    <div class="bg-white shadow p-8 rounded-lg w-full max-w-5xl">
      <div class="flex flex-col gap-2">
        <!-- Responsive: calendar on its own row on mobile, all in one row on desktop -->
        <div class="flex sm:flex-row flex-col gap-2">
          <div class="w-full sm:w-auto">
            <label class="block mb-1 text-gray-500 text-xs">Send on</label>
            <CalendarDropdown v-model="sendDate" class="w-full sm:w-64" />
          </div>
          <div class="flex flex-row justify-start sm:justify-end gap-2 w-full">
            <div class="">
              <label class="block mb-1 text-gray-500 text-xs">Sending currency</label>
              <CurrencyDropdown
                :selected="sendingCurrency"
                @selected="onSendingCurrencySelected"
                class="w-28 sm:w-44 md:w-44"
              />
            </div>
            <div class="">
              <label class="block mb-1 text-gray-500 text-xs">Recieving currency</label>
              <CurrencyDropdown
                :selected="recievingCurrency"
                @selected="onRecievingCurrencySelected"
                class="w-28 sm:w-32 md:w-44"
              />
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <ToggleButton
            :disabled="!selectedCurrency.value"
            :model-value="distributeCurrencyBy === 'send-currency'"
            @update:model-value="toggleDistributeCurrencyBy"
          />

          <div
            :class="[
              'flex items-center gap-2',
              {
                'opacity-50 text-gray-600': !selectedCurrency.value,
                'text-gray-700': selectedCurrency.value,
              },
            ]"
          >
            <div v-if="selectedCurrency.value" class="flex items-center gap-2">
              <p class="whitespace-nowrap">Distribute with:</p>
              <Flag :currency-code="selectedCurrency.value.value" />
              <b class="whitespace-nowrap">{{ selectedCurrency.value.value }}</b>
            </div>
            <p v-else class="whitespace-nowrap">Select Currency</p>
          </div>
        </div>
      </div>
      <!-- Select Recipients List -->
      <div class="mt-2">
        <RecipientList />
      </div>
      <!-- Recipients Table Placeholder -->
    </div>
    <!-- Summary Card -->
    <div class="bg-white shadow mt-6 p-6 rounded-lg w-full max-w-5xl">
      <div class="flex md:flex-row flex-col md:justify-between md:items-center gap-6">
        <!-- Summary Items -->
        <div class="flex md:flex-row flex-col flex-1 md:items-center md:gap-12">
          <div class="flex flex-col mb-4 md:mb-0">
            <span class="mb-1 text-gray-600 text-base">Total to send</span>
            <span class="font-bold text-2xl">$1,500.00 USD</span>
          </div>
          <div class="flex flex-col mb-4 md:mb-0">
            <span class="mb-1 text-gray-600 text-base">Exchange rate</span>
            <span class="font-bold text-2xl">1 USD = 0.92 GBP</span>
          </div>
          <div class="flex flex-col mb-4 md:mb-0">
            <span class="mb-1 text-gray-600 text-base">Recipients will receive</span>
            <span class="font-bold text-2xl">£1,380.00 GBP</span>
          </div>
          <div class="flex flex-col">
            <span class="mb-1 text-gray-600 text-base">Total to pay</span>
            <span class="font-bold text-2xl">$1,515.00 USD</span>
            <span class="mt-1 text-gray-400 text-sm">Includes fee: $15.00 USD</span>
          </div>
        </div>
        <!-- Continue Button -->
        <button
          class="flex justify-center items-center self-center gap-2 bg-black hover:bg-gray-900 py-4 rounded-lg w-full md:w-72 font-medium text-white text-lg transition"
          style="min-width: 200px"
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
  </IsolatedPageLayout>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import IsolatedPageLayout from '@/layouts/IsolatedPageLayout.vue'
import CalendarDropdown from '../components/CalendarDropdown.vue'
import CurrencyDropdown, { type CurrencyDropdownOption } from '../components/CurrencyDropdown.vue'
import ToggleButton from '@/components/ToggleButton.vue'
import Flag from '@/components/Flag.vue'
import { useProfile } from '@/hooks/useProfile'
import type { CurrencyCode } from '@/constants/from-api/currency.constants'
import RecipientList from '@/components/RecipientList.vue'

const { data: profileData } = useProfile()

const distributeCurrencyBy = ref<'send-currency' | 'recieving-currency'>('send-currency')
const toggleDistributeCurrencyBy = () => {
  distributeCurrencyBy.value =
    distributeCurrencyBy.value === 'send-currency' ? 'recieving-currency' : 'send-currency'
}
const selectedCurrency = computed(() =>
  distributeCurrencyBy.value === 'recieving-currency' ? recievingCurrency : sendingCurrency,
)

const sendDate = ref<Date | null>(new Date())
const sendingCurrency = ref<CurrencyDropdownOption | null>(null)
const recievingCurrency = ref<CurrencyDropdownOption | null>(null)

watchEffect(() => {
  if (profileData.value?.profile) {
    const { expectedTradeCurrency, expectedPayoutCurrency } = profileData.value.profile
    console.log('Profile data:', {
      expectedTradeCurrency,
      expectedPayoutCurrency,
    })
    sendingCurrency.value = {
      value: expectedTradeCurrency as CurrencyCode,
      label: expectedTradeCurrency as string,
    }
    recievingCurrency.value = {
      value: expectedPayoutCurrency as CurrencyCode,
      label: expectedPayoutCurrency as string,
    }
  }
})

const onSendingCurrencySelected = (val: CurrencyDropdownOption | null) =>
  (sendingCurrency.value = val)
const onRecievingCurrencySelected = (val: CurrencyDropdownOption | null) =>
  (recievingCurrency.value = val)
</script>
