<template>
  <IsolatedPageLayout v-if="true">
    <div class="flex flex-col flex-1 mx-auto w-full max-w-5xl min-h-0">
      <div class="flex justify-start items-center mb-2 w-full">
        <h1 class="font-semibold text-2xl">Multiple Recipients</h1>
      </div>
      <div class="flex flex-col flex-grow gap-8 bg-white shadow p-8 rounded-lg w-full">
        <!-- Add a button to trigger the modal for demonstration -->
        <div class="my-4">
          <Button @click="showDemoModal">Show Warning Modal</Button>
        </div>

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
            :selectedCurrencyCode="receivingCurrencyCode"
          />
        </div>
        <!-- Recipients Table Placeholder -->
      </div>
      <SummaryCard
      :quote="quoteData"
      :is-loading="isLoadingQuote"
        @continue="() => {}"
      />
    </div>
    <WarningModal :state="warningModal" />
  </IsolatedPageLayout v-if="false">
</template>

<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
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
import type { MultipayRecipientValues } from './ui/RecipientList/recipient-list.types'
import { useCreateQuoteOnInputChange, type UseCreateQuoteInput } from './composables/useCreateQuoteOnInputChange'
import { useGetQuote } from './domain/useGetQuote'
import WarningModal from '@/components/WarningModal.vue'
import { useWarningModal } from '@/composables/useWarningModal'
import Button from '@/components/ui/button/Button.vue'

const warningModal = useWarningModal();

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

const { data: profileData } = useProfile()

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

const receivingCurrencyCode = computed(() => recievingCurrency.value?.value ?? null)

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
  const nextIndex = recipients.value.length > 0
    ? Math.max(...recipients.value.map((r: MultiPayRecipient) => r.index)) + 1
    : 1
  recipients.value = [
    ...recipients.value,
    {
      index: nextIndex,
      values: {
        recipient: null,
        amount: null,
        reason: '',
        reference: '',
      },
      state: {
        recipient: { hasEnteredFocus: false, hasLeftFocus: false },
        amount: { hasEnteredFocus: false, hasLeftFocus: false },
        reason: { hasEnteredFocus: false, hasLeftFocus: false },
        reference: { hasEnteredFocus: false, hasLeftFocus: false },
      }
    },
  ]
}

const removeRecipient = (index: number) => {
  recipients.value = [...recipients.value].filter((r: MultiPayRecipient) => r.index !== index)
}

const updateRecipient = (index: number, newValues: Partial<MultipayRecipientValues>) => {
  recipients.value = [...recipients.value].map((r: MultiPayRecipient) =>
    r.index === index ? { ...r, values: { ...r.values, ...newValues } } : { ...r }
  )
}


const totalAmount = computed(() =>
  recipients.value.reduce((sum, recipient) => sum + (recipient.values.amount ?? 0), 0)
)




const quoteInput = computed<UseCreateQuoteInput>(() => ({
  amount: totalAmount.value,
  userCountry: 'US',
  countryTo: 'GB',
  amountTo: null,
  sellCcy: typeof sendingCurrency.value === 'string' ? sendingCurrency.value : sendingCurrency.value?.value ?? 'USD',
  buyCcy: typeof recievingCurrency.value === 'string' ? recievingCurrency.value : recievingCurrency.value?.value ?? 'GBP',
  fixedCcy: typeof sendingCurrency.value === 'string' ? sendingCurrency.value : sendingCurrency.value?.value ?? 'USD',
  screen: 'multipay',
  platformType: 'web',
  shouldCalcAmountFrom: true,
  promotionCodes: [],
  deliveryMethod: 'BankAccount'
}))

const { quoteId, isLoading } = useCreateQuoteOnInputChange(quoteInput)
const {data: quoteData, isLoading: isLoadingQuote } = useGetQuote(quoteId)


watch(quoteData, () => console.log(quoteData))

// Function to trigger the modal and log the result
const showDemoModal = async () => {
  const { accepted } = await warningModal.open({
    title: "Demo Warning Updated",
    message: "This is a test of the updated warning modal. Please choose an action."
  });

  if (accepted) {
    console.log('Modal accepted (updated flow)');
  } else {
    console.log('Modal rejected/cancelled (updated flow)');
  }
};


</script>
