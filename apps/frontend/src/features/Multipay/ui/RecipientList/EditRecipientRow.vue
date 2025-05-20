<script setup lang="ts">
import type { CurrencyCode } from '@/constants/from-api/currency.constants'
import { defineEmits, defineProps, ref } from 'vue'
import RecipientSearch, {
  type RecipientSearchOption,
} from '@/features/Multipay/ui/RecipientSearch.vue'
import MoneyInput from '@/features/Multipay/ui/MoneyInput.vue'
import { Icon } from '@iconify/vue'
import TableRow from '@/components/ui/table/TableRow.vue'
import TableCell from '@/components/ui/table/TableCell.vue'
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

const recipientSearchContainerRef = ref<HTMLElement | null>(null)
const reasonSearchContainerRef = ref<HTMLElement | null>(null)

const handleRecipientSelected = (
  selectedOption: RecipientSearchOption | null,
) => {
  if (selectedOption) {
    emit('update', {
      name: selectedOption.label,
      currencyCode: selectedOption.currencyCode as CurrencyCode,
    })
  }
}
</script>

<template>
  <TableRow
    class="data-[state=selected]:bg-muted hover:bg-muted/50 border-b h-10 transition-colors"
  >
    <TableCell class="w-[220px]" ref="recipientSearchContainerRef">
      <RecipientSearch
        @recipientSelected="handleRecipientSelected"
        :dropdownWidthRef="recipientSearchContainerRef"
      />
    </TableCell>
    <TableCell>
      <MoneyInput
        :model-value="props.amount !== null ? props.amount : ''"
        :currency="props.currencyCode"
        :disabled="false"
        :currency-selectable="false"
        @update:modelValue="
          (value: string | number) =>
            emit('update', { amount: parseFloat(String(value)) })
        "
        class="w-full"
      />
    </TableCell>
    <TableCell class="w-[200px]" ref="reasonSearchContainerRef">
      <ReasonSearch
        :model-value="props.reason"
        @update:modelValue="
          (value: string | null) => emit('update', { reason: value || '' })
        "
        class="w-full"
        :dropdownWidthRef="reasonSearchContainerRef"
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
