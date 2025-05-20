<script setup lang="ts">
import type { CurrencyCode } from '@/constants/from-api/currency.constants'
import { defineEmits, defineProps } from 'vue'
import RecipientSearch from '@/features/Multipay/ui/RecipientSearch.vue'
import MoneyInput from '@/features/Multipay/ui/MoneyInput.vue'
import { Icon } from '@iconify/vue'
import TableRow from '@/components/ui/table/TableRow.vue'
import TableCell from '@/components/ui/table/TableCell.vue'
import type { FERecipient } from '@/features/Multipay/domain/useRecipients'
import ReasonSearch from '../ReasonSearch.vue'

const props = defineProps<{
  id: number
  name: string
  currencyCode: CurrencyCode
  amount: number | null
  reason: string
  reference?: string
}>()

const emit = defineEmits<{
  (e: 'update', data: Partial<typeof props>): void
  (e: 'remove'): void
}>()

const handleRecipientSelected = (recipient: FERecipient | null) => {
  if (recipient) {
    emit('update', {
      name: recipient.recipientDisplayName,
      currencyCode: recipient.currencyCode as CurrencyCode,
    })
  }
}
</script>

<template>
  <TableRow
    class="data-[state=selected]:bg-muted hover:bg-muted/50 border-b h-10 transition-colors"
  >
    <TableCell>
      <RecipientSearch @recipientSelected="handleRecipientSelected" />
    </TableCell>
    <TableCell>
      <MoneyInput
        :model-value="props.amount !== null ? props.amount : ''"
        :currency="props.currencyCode"
        :disabled="false"
        :currency-selectable="false"
        @update:modelValue="
          (value) => emit('update', { amount: parseFloat(String(value)) })
        "
        class="w-full"
      />
    </TableCell>
    <TableCell class="w-[250px]">
      <ReasonSearch
        :model-value="props.reason"
        @update:modelValue="
          (value: string | null) => emit('update', { reason: value || '' })
        "
        class="w-full"
      />
    </TableCell>
    <TableCell>
      <input
        :value="props.reference || ''"
        @input="
          (e) =>
            emit('update', {
              reference: (e.target as HTMLInputElement)?.value || '',
            })
        "
        class="p-2 border rounded w-full"
      />
    </TableCell>
    <TableCell>
      <button
        @click="$emit('remove')"
        title="Remove Recipient"
        class="text-red-500 hover:text-red-700"
      >
        <Icon :icon="'carbon:trash-can'" class="w-5 h-5" />
      </button>
    </TableCell>
  </TableRow>
</template>
