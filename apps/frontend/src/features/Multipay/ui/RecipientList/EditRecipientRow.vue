<script setup lang="ts">
import type { CurrencyCode } from '@/constants/from-api/currency.constants'
import { ref, type VNodeRef, computed } from 'vue'
import RecipientSearch, {
  type RecipientSearchOption,
} from '@/features/Multipay/ui/RecipientSearch.vue'
import MoneyInput from '@/features/Multipay/ui/MoneyInput.vue'
import { Icon } from '@iconify/vue'
import TableRow from '@/components/ui/table/TableRow.vue'
import TableCell from '@/components/ui/table/TableCell.vue'
import ReasonSearch from '../ReasonSearch.vue'
import { Button } from '@/components/ui/button'
import type { FERecipient } from '../../domain/useRecipients'
import type {
  MultiPayRecipientContainer,
  MultipayRecipientValidations,
  RecipientFields,
} from './recipient-list.types'
import { cn } from '@/lib/utils'

const props = defineProps<{
  index: number
  values: MultiPayRecipientContainer['values']
  selectedCurrencyCode?: CurrencyCode | null
  validationState?: MultipayRecipientValidations
}>()

const emit = defineEmits<{
  (e: 'update', data: Partial<MultiPayRecipientContainer['values']>): void
  (e: 'remove'): void
  (e: 'field-focus', fieldName: keyof RecipientFields): void
  (e: 'field-blur', fieldName: keyof RecipientFields): void
}>()

const recipientSearchContainerRef = ref<VNodeRef | null>(null)
const reasonSearchContainerRef = ref<VNodeRef | null>(null)

const recipientValidator = computed(() => {
  return (
    recipient: FERecipient,
  ): { isValid: true } | { isValid: false; reason: string } => {
    if (
      props.selectedCurrencyCode &&
      recipient.currencyCode !== props.selectedCurrencyCode
    ) {
      return {
        isValid: false,
        reason: `Currency mismatch (needs ${props.selectedCurrencyCode})`,
      }
    }
    return { isValid: true }
  }
})

const handleRecipientSelected = (
  selectedOption: RecipientSearchOption | null,
) => {
  if (selectedOption) {
    const newRecipient: FERecipient = {
      recipientId: selectedOption.recipientId,
      recipientDisplayName: selectedOption.label,
      currencyCode: selectedOption.currencyCode as CurrencyCode,
      bankCountryCode: selectedOption.bankCountryCode,
      bankName: selectedOption.bankName,
      accountNumber: selectedOption.accountNumber,
    }
    emit('update', { recipient: newRecipient })
  } else {
    emit('update', { recipient: null })
  }
}
</script>

<template>
  <TableRow
    :class="[
      'data-[state=selected]:bg-muted border-b border-gray-100 h-10 transition-colors',
    ]"
  >
    <TableCell
      class="py-3 w-[220px] align-top pl-0"
      ref="recipientSearchContainerRef"
    >
      <RecipientSearch
        :initial-recipient="props.values.recipient"
        @recipientSelected="handleRecipientSelected"
        @focus="emit('field-focus', 'recipient')"
        @blur="emit('field-blur', 'recipient')"
        :dropdownWidthRef="recipientSearchContainerRef"
        :validator="recipientValidator"
        :class="cn({
          'border-red-500': validationState?.fieldErrors?.recipient?.length
        })"
      >
        <template #invalid-item="{ recipient: invalidRecipientInfo }">
          <div
            class="flex justify-between items-center w-full cursor-not-allowed"
            :title="invalidRecipientInfo.validationReason"
          >
            <span class="opacity-50">{{ invalidRecipientInfo.label }}</span>
          </div>
        </template>
      </RecipientSearch>
      <div
        v-if="validationState?.fieldErrors?.recipient?.length"
        class="mt-1 text-red-500 text-xs"
      >
        <div
          v-for="error in validationState.fieldErrors.recipient"
          :key="error"
        >
          {{ error }}
        </div>
      </div>
    </TableCell>
    <TableCell class="py-3 align-top">
      <MoneyInput
        :model-value="props.values.amount !== null ? props.values.amount : ''"
        :currency="props.selectedCurrencyCode || 'USD'"
        :disabled="!props.values.recipient || !props.selectedCurrencyCode"
        :currency-selectable="false"
        @update:modelValue="
          (value: string | number) =>
            emit('update', { amount: parseFloat(String(value)) })
        "
        @focus="emit('field-focus', 'amount')"
        @blur="emit('field-blur', 'amount')"
        :class="cn({
          'border-red-500': validationState?.fieldErrors?.amount?.length
        })"
      />
      <div :v-if="true" class="mt-1 text-red-500 text-xs">
        <div v-for="error in validationState?.fieldErrors.amount" :key="error">
          {{ error }}
        </div>
      </div>
    </TableCell>
    <TableCell class="py-3 w-[220px] align-top" ref="reasonSearchContainerRef">
      <ReasonSearch
        :model-value="props.values.reason"
        @update:modelValue="
          (newReason) => emit('update', { reason: newReason })
        "
        @focus="emit('field-focus', 'reason')"
        @blur="emit('field-blur', 'reason')"
        :dropdownWidthRef="reasonSearchContainerRef"
        :class="cn(
          'w-full',
          {
            'border-red-500': validationState?.fieldErrors?.reason?.length
          }
        )"
      />
      <div
        v-if="validationState?.fieldErrors?.reason?.length"
        class="mt-1 text-red-500 text-xs"
      >
        <div v-for="error in validationState.fieldErrors.reason" :key="error">
          {{ error }}
        </div>
      </div>
    </TableCell>
    <TableCell class="py-3 align-top">
      <input
        :value="props.values.reference || ''"
        @input="
          (e) =>
            emit('update', {
              reference: (e.target as HTMLInputElement)?.value || '',
            })
        "
        @focus="emit('field-focus', 'reference')"
        @blur="emit('field-blur', 'reference')"
        :class="cn(
          'p-2 border rounded-lg w-full h-10 border-gray-150',
          {
            'border-red-500': validationState?.fieldErrors?.reference?.length
          }
        )"
        placeholder="Optional reference"
      />
      <div
        v-if="validationState?.fieldErrors?.reference?.length"
        class="mt-1 text-red-500 text-xs"
      >
        <div
          v-for="error in validationState.fieldErrors.reference"
          :key="error"
        >
          {{ error }}
        </div>
      </div>
    </TableCell>
    <TableCell class="py-3 align-top">
      <Button
        @click="$emit('remove')"
        title="Remove Recipient"
        class="text-gray-400 hover:text-gray-500 hover:bg-gray-50 bg-transparent border-0 shadow-none"
      >
        <Icon :icon="'carbon:trash-can'" class="w-5 h-5" />
      </Button>
    </TableCell>
  </TableRow>
</template>
