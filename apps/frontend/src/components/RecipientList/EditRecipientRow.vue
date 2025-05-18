<script setup lang="ts">
import type { CurrencyCode } from '@/constants/from-api/currency.constants'
import { defineEmits, defineProps } from 'vue'
import RecipientSearch from '@/components/RecipientSearch.vue'
import MoneyInput from '@/components/ui/MoneyInput.vue'
import { Icon } from '@iconify/vue'
import TableRow from '../ui/table/TableRow.vue'
import TableCell from '../ui/table/TableCell.vue'

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

const isComplete = props.name.trim() !== '' && props.amount !== null && props.reason.trim() !== ''
</script>

<template>
  <TableRow
    class="data-[state=selected]:bg-muted hover:bg-muted/50 border-b h-10 transition-colors"
  >
    <TableCell>
      <RecipientSearch
        @update:modelValue="
          (option) =>
            emit('update', {
              name: option.label,
              currencyCode: option.currencyCode,
            })
        "
      />
    </TableCell>
    <TableCell>
      <MoneyInput
        :model-value="props.amount !== null ? props.amount : ''"
        :currency="props.currencyCode"
        :disabled="false"
        :currency-selectable="false"
        @update:modelValue="(value) => emit('update', { amount: parseFloat(String(value)) })"
        class="w-full"
      />
    </TableCell>
    <TableCell>{{ props.reason || '—' }}</TableCell>
    <TableCell>
      <input
        :value="props.reference || ''"
        @input="(e) => emit('update', { reference: (e.target as HTMLInputElement)?.value || '' })"
      />
    </TableCell>
    <TableCell>
      <button @click="$emit('remove')" title="Remove Recipient">
        <Icon :icon="'carbon:trash-can'" />
      </button>
    </TableCell>
  </TableRow>
</template>
