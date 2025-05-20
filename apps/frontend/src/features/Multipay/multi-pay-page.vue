<template>
  <IsolatedPageLayout v-if="true">
    <div class="flex flex-col flex-1 mx-auto w-full max-w-5xl min-h-0">
      <div class="flex justify-start items-center mb-2 w-full">
        <h1 class="font-semibold text-2xl">Multiple Recipients</h1>
      </div>
      <div class="flex flex-col flex-grow gap-8 bg-white shadow p-8 rounded-lg w-full">
        <div class="flex flex-col gap-6">
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
                  class="w-28 sm:w-32 md:w-44"
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
        <div class="">
          <RecipientList
            :recipients="recipients"
            @add="addRecipient"
            @remove="removeRecipient"
            @update="updateRecipient"
            :open-ids="openIds"
            @toggle-open="handleOpenChange"
          />
        </div>
        <!-- Recipients Table Placeholder -->
      </div>
      <SummaryCard
        total-to-send="$1,500.00 USD"
        exchange-rate="1 USD = 0.92 GBP"
        recipients-will-receive="£1,380.00 GBP"
        total-to-pay="$1,515.00 USD"
        fee="$15.00 USD"
        @continue="() => {}"
      />
    </div>
  </IsolatedPageLayout v-if="false">
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import IsolatedPageLayout from '@/layouts/IsolatedPageLayout.vue'
import CurrencyDropdown, { type CurrencyDropdownOption } from '@/features/Multipay/ui/CurrencyDropdown.vue'
import ToggleButton from '@/features/Multipay/ui/ToggleButton.vue'
import Flag from '@/components/Flag.vue'
import { useProfile } from '@/hooks/useProfile'
import type { CurrencyCode } from '@/constants/from-api/currency.constants'
import SummaryCard from '@/features/Multipay/ui/SummaryCard.vue'
import CalendarDropdown from '@/features/Multipay/ui/CalendarDropdown.vue'
import RecipientList from './ui/RecipientList/RecipientList.vue'
import type { MultiPayRecipient } from './ui/RecipientList/RecipientList.vue'

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

const recipients = ref<MultiPayRecipient[]>([
])

// --- Collapsible open state ---
const openIds = ref<number[]>([])


const handleOpenChange = (id: number, open: boolean) => {
  openIds.value = open
    ? [...openIds.value, id]
    : openIds.value.filter((openId: number) => openId !== id)
}

const addRecipient = () => {
  const nextId = recipients.value.length > 0 ? Math.max(...recipients.value.map((r: MultiPayRecipient) => r.id)) + 1 : 1
  recipients.value = [
    ...recipients.value,
    { id: nextId, name: '', amount: null, reason: '', currencyCode: 'USD' as CurrencyCode, reference: '' },
  ]
}

const removeRecipient = (id: number) => {
  recipients.value = recipients.value.filter((r: MultiPayRecipient) => r.id !== id)
}

const updateRecipient = (id: number, newData: Partial<MultiPayRecipient>) => {
  recipients.value = recipients.value.map((r: MultiPayRecipient) => (r.id === id ? { ...r, ...newData } : r))
}
</script>
