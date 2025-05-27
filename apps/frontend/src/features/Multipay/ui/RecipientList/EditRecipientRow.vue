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
import type { RecipientFields } from './recipient-list.types'
import Flag from '@/components/Flag.vue'

const props = defineProps<{
  index: number
  values: RecipientFields
  selectedCurrencyCode?: CurrencyCode | null
}>()

const emit = defineEmits<{
  (e: 'update', data: Partial<RecipientFields>): void
  (e: 'remove'): void
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
    class="data-[state=selected]:bg-muted border-b h-10 transition-colors"
  >
    <TableCell class="w-[220px]" ref="recipientSearchContainerRef">
      <RecipientSearch
        :initial-recipient="props.values.recipient"
        @recipientSelected="handleRecipientSelected"
        :dropdownWidthRef="recipientSearchContainerRef"
        :validator="recipientValidator"
      >
        <template #invalid-item="{ recipient: invalidRecipientInfo }">
          <div
            class="flex justify-between items-center w-full"
            :title="invalidRecipientInfo.validationReason"
          >
            <span class="opacity-50">{{ invalidRecipientInfo.label }}</span>
            <Icon icon="carbon:misuse" class="ml-1 w-4 h-4 text-red-500" />
          </div>
        </template>
      </RecipientSearch>
    </TableCell>
    <TableCell>
      <MoneyInput
        :model-value="props.values.amount !== null ? props.values.amount : ''"
        :currency="props.selectedCurrencyCode || 'USD'"
        :disabled="!props.values.recipient || !props.selectedCurrencyCode"
        :currency-selectable="false"
        @update:modelValue="
          (value: string | number) =>
            emit('update', { amount: parseFloat(String(value)) })
        "
        class="w-full"
      />
    </TableCell>
    <TableCell class="w-[220px]" ref="reasonSearchContainerRef">
      <ReasonSearch
        :model-value="props.values.reason"
        @update:modelValue="
          (newReason) => emit('update', { reason: newReason })
        "
        class="w-full"
        :dropdownWidthRef="reasonSearchContainerRef"
      />
    </TableCell>
    <TableCell>
      <input
        :value="props.values.reference || ''"
        @input="
          (e) =>
            emit('update', {
              reference: (e.target as HTMLInputElement)?.value || '',
            })
        "
        class="p-2 border rounded w-full"
        placeholder="Optional reference"
      />
    </TableCell>
    <TableCell>
      <Button
        @click="$emit('remove')"
        title="Remove Recipient"
        class="text-red-500 hover:text-red-700"
        variant="ghost"
      >
        <Icon :icon="'carbon:trash-can'" class="w-5 h-5" />
      </Button>
    </TableCell>
  </TableRow>
</template>
