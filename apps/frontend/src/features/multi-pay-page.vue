<template>
  <IsolatedPageLayout>
    <div class="bg-white shadow p-8 rounded-lg w-full max-w-5xl">
      <div class="flex justify-between items-center mb-8">
        <h1 class="font-semibold text-2xl">Multiple Recipients</h1>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex flex-row gap-2">
          <div>
            <label class="block mb-1 text-gray-500 text-xs">Send on</label>
            <CalendarDropdown v-model="sendDate" class="w-28 sm:w-52" />
          </div>
          <div>
            <label class="block mb-1 text-gray-500 text-xs">Sending currency</label>
            <CurrencyDropdown
              :selected="sendingCurrency"
              @selected="onSendingCurrencySelected"
              class="w-28 sm:w-52"
            />
          </div>
          <div>
            <label class="block mb-1 text-gray-500 text-xs">Recieving currency</label>
            <CurrencyDropdown
              :selected="recievingCurrency"
              @selected="onRecievingCurrencySelected"
              class="w-28 sm:w-52"
            />
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
      <!-- Recipients Table Placeholder -->
      <div class="mt-8">
        <!-- Table will go here -->
        <DropdownMenuDemo />
      </div>
    </div>
  </IsolatedPageLayout>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import IsolatedPageLayout from '@/layouts/IsolatedPageLayout.vue'
import CalendarDropdown from '../components/CalendarDropdown.vue'
import ProfileDropdown from '@/components/ProfileDropdown.vue'
import CurrencyDropdown, { type CurrencyDropdownOption } from '../components/CurrencyDropdown.vue'
import RecipientDropdown from '../components/RecipientDropdown.vue'
import ToggleButton from '@/components/ToggleButton.vue'
import Flag from '@/components/Flag.vue'
import { useProfile } from '@/hooks/useProfile'
import type { CurrencyCode } from '@/constants/from-api/currency.constants'

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
