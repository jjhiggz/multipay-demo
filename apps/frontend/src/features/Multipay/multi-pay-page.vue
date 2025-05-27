<template>
  <IsolatedPageLayout v-if="true">
    <div class="flex flex-col flex-1 mx-auto w-full max-w-5xl min-h-0">
      <div class="flex justify-start items-center mb-2 w-full">
        <h1 class="font-bold text-gray-800 text-2xl">Multiple Recipients</h1>
      </div>
      <div class="flex flex-col flex-grow gap-8 p-8 rounded-xl w-full">
        <div class="flex flex-col gap-6">
          <!-- Responsive: calendar on its own row on mobile, all in one row on desktop -->
          <div class="flex sm:flex-row flex-col gap-2">
            <div class="w-full sm:w-auto">
              <CalendarDropdown v-model="sendDate" class="w-full sm:w-64" />
            </div>
            <div
              class="flex flex-row justify-start sm:justify-end gap-3 w-full"
            >
              <div class="">
                <CurrencyDropdown
                  :selected="sendingCurrency"
                  @selected="onSendingCurrencySelected"
                  label="You send"
                  usdClass="text-l font-bold text-gray-900"
                  variant="borderless"
                />
              </div>
              <div class="">
                <CurrencyDropdown
                  :selected="recievingCurrency"
                  @selected="onRecievingCurrencySelected"
                  label="Receiving currency"
                  class="shadow-none border-0"
                  usdClass="text-l font-bold text-gray-900"
                  variant="borderless"
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
              <div
                v-if="selectedCurrency.value"
                class="flex items-center gap-2"
              >
                <p class="whitespace-nowrap">Distribute with:</p>
                <Flag :currency-code="selectedCurrency.value.value" />
                <b class="whitespace-nowrap">{{
                  selectedCurrency.value.value
                }}</b>
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
            @recipient-field-focus="handleFieldFocus"
            @recipient-field-blur="handleFieldBlur"
            :open-ids="openIds"
            @toggle-open="handleOpenChange"
            :selectedCurrencyCode="receivingCurrencyCode"
            :has-form-been-submitted="hasFormBeenSubmitted"
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
        :is-disabled="false"
        button-aria-label="Continue to payment"
        :quote="quoteData"
        :is-loading="isLoadingQuote"
        @continue="handleContinue"
      />
    </div>
    <WarningModal :state="warningModal" />
  </IsolatedPageLayout>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import IsolatedPageLayout from '@/layouts/IsolatedPageLayout.vue'
import CurrencyDropdown, {
  type CurrencyDropdownOption,
} from '@/features/Multipay/ui/CurrencyDropdown.vue'
import ToggleButton from '@/features/Multipay/ui/ToggleButton.vue'
import Flag from '@/components/Flag.vue'
import { useProfile } from '@/hooks/useProfile'
import type { CurrencyCode } from '@/constants/from-api/currency.constants'
import SummaryCard from '@/features/Multipay/ui/SummaryCard.vue'
import CalendarDropdown from '@/features/Multipay/ui/CalendarDropdown.vue'
import RecipientList from './ui/RecipientList/RecipientList.vue'
import type {
  MultiPayRecipientContainer,
  RecipientFields,
} from './ui/RecipientList/recipient-list.types'
import {
  useCreateQuoteOnInputChange,
  type UseCreateQuoteInput,
} from './composables/useCreateQuoteOnInputChange'
import { useGetQuote } from './domain/useGetQuote'
import WarningModal from '@/components/WarningModal.vue'
import { useWarningModal } from '@/composables/useWarningModal'
import { getMultipayRecipientValidations } from '@/features/Multipay/ui/RecipientList/recipient-list.validators'

const warningModal = useWarningModal()
const hasFormBeenSubmitted = ref(false)

const distributeCurrencyBy = ref<'send-currency' | 'recieving-currency'>(
  'send-currency',
)

const sendDate = ref<Date | null>(new Date())
const sendingCurrency = ref<CurrencyDropdownOption | null>(null)
const recievingCurrency = ref<CurrencyDropdownOption | null>(null)

const { data: profileData } = useProfile()

watchEffect(() => {
  if (
    profileData.value?.profile &&
    !sendingCurrency.value &&
    !recievingCurrency.value
  ) {
    const { expectedTradeCurrency, expectedPayoutCurrency } =
      profileData.value.profile
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

const receivingCurrencyCode = computed(
  () => recievingCurrency.value?.value ?? null,
)

const recipients = ref<MultiPayRecipientContainer[]>([])

// --- Collapsible open state ---
const openIds = ref<number[]>([])

const handleOpenChange = (id: number, open: boolean) => {
  openIds.value = open
    ? [...openIds.value, id]
    : openIds.value.filter((openId: number) => openId !== id)
}

const addRecipient = () => {
  const nextIndex =
    recipients.value.length > 0
      ? Math.max(
          ...recipients.value.map((r: MultiPayRecipientContainer) => r.index),
        ) + 1
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
        byField: {
          recipient: { hasEnteredFocus: false, hasLeftFocus: false },
          amount: { hasEnteredFocus: false, hasLeftFocus: false },
          reason: { hasEnteredFocus: false, hasLeftFocus: false },
          reference: { hasEnteredFocus: false, hasLeftFocus: false },
        },
        hasEnteredFocus: false,
        hasLeftFocus: false,
      },
    },
  ]
}

const removeRecipient = (index: number) => {
  recipients.value = [...recipients.value].filter(
    (r: MultiPayRecipientContainer) => r.index !== index,
  )
}

const updateRecipient = (
  index: number,
  newValues: Partial<MultiPayRecipientContainer['values']>,
) => {
  recipients.value = recipients.value.map((r) => {
    if (r.index === index) {
      const updatedValues = { ...r.values, ...newValues }
      const newState = { ...r.state }

      return { ...r, values: updatedValues, state: newState }
    }
    return r
  })
}

const totalAmount = computed(() =>
  recipients.value.reduce(
    (sum, recipient) => sum + (recipient.values.amount ?? 0),
    0,
  ),
)

const quoteInput = computed<UseCreateQuoteInput>(() => {
  return {
    amount: totalAmount.value,
    userCountry: 'US',
    countryTo: 'GB',
    amountTo: null,
    sellCcy: sendingCurrency.value?.value ?? 'USD',
    buyCcy: recievingCurrency.value?.value ?? 'GBP',
    fixedCcy: sendingCurrency.value?.value ?? 'USD',
    screen: 'multipay',
    platformType: 'web',
    shouldCalcAmountFrom: true,
    promotionCodes: [],
    deliveryMethod: 'BankAccount',
  }
})

const { quoteId } = useCreateQuoteOnInputChange(quoteInput)
const { data: quoteData, isLoading: isLoadingQuote } = useGetQuote(quoteId)

const resetAllRecipientAmounts = () => {
  recipients.value = recipients.value.map((r) => ({
    ...r,
    values: {
      ...r.values,
      amount: 0,
    },
  }))
  hasFormBeenSubmitted.value = false
}

const shouldWarnForCurrencyChange = computed(() => {
  if (recipients.value.length === 0) {
    return false
  }
  return recipients.value.some(
    (recipient) =>
      recipient.values.amount !== 0 && recipient.values.amount !== null,
  )
})

const openWarningModalIfNecessaryAndExecuteIfNotRejected = async <T,>(
  executor: () => Promise<T> | T,
  warningOptions: {
    title: string
    message: string
    icon?: string
  },
  checkAmounts = true,
): Promise<T | null> => {
  const shouldWarn = checkAmounts ? shouldWarnForCurrencyChange.value : true
  const shouldContinue = shouldWarn
    ? (await warningModal.open(warningOptions)).accepted
    : true

  if (shouldContinue) {
    const result = await executor()
    return result
  }
  return null
}

const toggleDistributeCurrencyBy = async () => {
  await openWarningModalIfNecessaryAndExecuteIfNotRejected(
    () => {
      distributeCurrencyBy.value =
        distributeCurrencyBy.value === 'send-currency'
          ? 'recieving-currency'
          : 'send-currency'
      resetAllRecipientAmounts()
    },
    {
      title: 'Confirm Change',
      message:
        'Changing the distribution currency will reset all recipient amounts, and may invalidate your recipients. Are you sure?',
      icon: 'warning',
    },
  )
}

const onSendingCurrencySelected = async (
  newVal: CurrencyDropdownOption | null,
) => {
  if (newVal?.value === sendingCurrency.value?.value && newVal !== null) {
    sendingCurrency.value = newVal
    return
  }
  await openWarningModalIfNecessaryAndExecuteIfNotRejected(
    () => {
      sendingCurrency.value = newVal
      resetAllRecipientAmounts()
    },
    {
      title: 'Confirm Currency Change',
      message:
        'Changing the sending currency will reset all recipient amounts. Are you sure?',
      icon: 'warning',
    },
    recipients.value.length > 0 && sendingCurrency.value !== null,
  )
}

const onRecievingCurrencySelected = async (
  newVal: CurrencyDropdownOption | null,
) => {
  if (newVal?.value === recievingCurrency.value?.value && newVal !== null) {
    recievingCurrency.value = newVal
    return
  }
  await openWarningModalIfNecessaryAndExecuteIfNotRejected(
    () => {
      recievingCurrency.value = newVal
      resetAllRecipientAmounts()
    },
    {
      title: 'Confirm Currency Change',
      message:
        'Changing the receiving currency will reset all recipient amounts. Are you sure?',
      icon: 'warning',
    },
    recipients.value.length > 0 && recievingCurrency.value !== null,
  )
}

const selectedCurrency = computed(() =>
  distributeCurrencyBy.value === 'recieving-currency'
    ? recievingCurrency
    : sendingCurrency,
)

const handleContinue = () => {
  hasFormBeenSubmitted.value = true
  console.log('Continue clicked, form submission attempted.')

  const allRecipientsValid = recipients.value.every((recipient) => {
    const validationState = getMultipayRecipientValidations(recipient, true)
    return !(
      validationState.recipientErrors.length > 0 ||
      Object.values(validationState.fieldErrors).some(
        (errors: string[]) => errors.length > 0,
      )
    )
  })

  if (allRecipientsValid) {
    console.log('All recipients are valid. Proceeding...')
  } else {
    console.log('Some recipients have errors. Please review.')
  }
}

const handleFieldFocus = (
  recipientIndex: number,
  fieldName: keyof RecipientFields,
) => {
  const recipient = recipients.value.find((r) => r.index === recipientIndex)
  if (recipient) {
    recipient.state.byField[fieldName].hasEnteredFocus = true
    // Mark the container as entered if any field is focused
    recipient.state.hasEnteredFocus = true
    // Optional: If a field is re-focused, its hasLeftFocus should be reset for that specific field
    recipient.state.byField[fieldName].hasLeftFocus = false
    // Optional: Reset overall container left focus if a new field interaction starts
    // recipient.state.hasLeftFocus = false;
  }
}

const handleFieldBlur = (
  recipientIndex: number,
  fieldName: keyof RecipientFields,
) => {
  const recipient = recipients.value.find((r) => r.index === recipientIndex)
  if (recipient) {
    recipient.state.byField[fieldName].hasLeftFocus = true
    // If the container was already marked as entered, and now a field blurs,
    // it means the user has interacted and potentially left the container fields.
    if (recipient.state.hasEnteredFocus) {
      // This logic might need refinement: when does the *container* truly lose focus?
      // For now, any blur after an enter marks the container as having been left.
      // A more sophisticated approach might check if all active/focused elements within are now blurred.
      recipient.state.hasLeftFocus = true
    }
  }
}
</script>
