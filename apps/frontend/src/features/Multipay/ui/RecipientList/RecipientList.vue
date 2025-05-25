<template>
  <div>
    <!-- Show when no recipients -->
    <div
      v-if="props.recipients.length === 0"
      class="flex flex-col items-center gap-4 py-8"
    >
      <div class="text-gray-500">No recipients added yet</div>
      <Button
        @click="$emit('add')"
        class="flex items-center gap-2 bg-blue-300 hover:bg-blue-400 px-4 py-2 rounded-md text-white transition-colors"
      >
        <Icon :icon="'carbon:add'" class="w-5 h-5" />
        Add Recipient
      </Button>
    </div>

    <!-- Desktop Table Layout -->
    <div v-if="props.recipients.length > 0" class="hidden md:block">
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Recipient </TableHead>
              <TableHead> Amount </TableHead>
              <TableHead> Reason </TableHead>
              <TableHead> Reference </TableHead>
              <TableHead> Actions </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <EditRecipientRow
              v-for="recipient in props.recipients"
              :key="recipient.index"
              :index="recipient.index"
              :values="recipient.values"
              :selectedCurrencyCode="props.selectedCurrencyCode"
              @update="emit('update', recipient.index, $event)"
              @remove="$emit('remove', recipient.index)"
            />
          </TableBody>
        </Table>
      </div>
      <div>
        <Button
          @click="$emit('add')"
          class="flex items-center gap-2 bg-blue-300 hover:bg-blue-400 px-4 py-2 rounded-md text-white transition-colors"
        >
          <Icon :icon="'carbon:add'" class="w-5 h-5" />
          Add Recipient
        </Button>
      </div>
    </div>

    <!-- Mobile Collapsible Card Layout -->
    <div
      v-if="props.recipients.length > 0"
      class="md:hidden space-y-2 py-6 pt-0"
    >
      <EditRecipientCard
        v-for="recipient in props.recipients"
        :key="recipient.index"
        :index="recipient.index"
        :values="recipient.values"
        :open="props.openIds.includes(recipient.index)"
        :selectedCurrencyCode="props.selectedCurrencyCode"
        @update="$emit('update', recipient.index, $event)"
        @remove="$emit('remove', recipient.index)"
        @update:open="$emit('toggle-open', recipient.index, $event)"
        class="mb-2"
      />
      <div>
        <Button
          @click="$emit('add')"
          class="flex items-center gap-2 bg-blue-300 hover:bg-blue-400 px-4 py-2 rounded-md w-full text-white transition-colors"
        >
          <Icon :icon="'carbon:add'" class="w-5 h-5" />
          Add Recipient
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { Icon } from '@iconify/vue'
import EditRecipientRow from './EditRecipientRow.vue'
import EditRecipientCard from './EditRecipientCard.vue'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
} from '@/components/ui/table'
import Button from '@/components/ui/button/Button.vue'
import type { FERecipient } from '../../domain/useRecipients'
import type { MultipayRecipientValues } from './recipient-list.types'
import type { CurrencyCode } from '@/constants/from-api/currency.constants'

export type MultiPayRecipient = {
  index: number
  values: MultipayRecipientValues
  state: Record<
    keyof MultipayRecipientValues,
    {
      hasEnteredFocus: boolean
      hasLeftFocus: boolean
    }
  >
}

const props = defineProps<{
  recipients: MultiPayRecipient[]
  openIds: number[]
  selectedCurrencyCode?: CurrencyCode | null
}>()

const emit = defineEmits<{
  (e: 'add'): void
  (e: 'remove', index: number): void
  (
    e: 'update',
    index: number,
    newValues: Partial<MultipayRecipientValues>,
  ): void
  (e: 'toggle-open', index: number, open: boolean): void
}>()
</script>
