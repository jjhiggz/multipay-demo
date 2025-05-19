<template>
  <div>
    <!-- Show when no recipients -->
    <div v-if="props.recipients.length === 0">
      <div>No recipients</div>
      <Button @click="$emit('add')">Add Recipient</Button>
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
              :key="recipient.id"
              v-bind="recipient"
              @update="emit('update', recipient.id, $event)"
              @remove="$emit('remove', recipient.id)"
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
    <div v-if="props.recipients.length > 0" class="md:hidden space-y-2 py-6 pt-0">
      <EditRecipientCard
        v-for="recipient in props.recipients"
        :key="recipient.id"
        v-bind="recipient"
        :open="props.openIds ? props.openIds.includes(recipient.id) : false"
        @update="(data) => $emit('update', recipient.id, data)"
        @remove="() => $emit('remove', recipient.id)"
        @update:open="(open: boolean) => $emit('toggle-open', recipient.id, open)"
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
import type { CurrencyCode } from '@/constants/from-api/currency.constants'
import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table'
import Button from '@/components/ui/button/Button.vue'

export type MultiPayRecipient = {
  id: number
  name: string
  amount: number | null
  reason: string
  currencyCode: CurrencyCode
  reference?: string
}

const props = defineProps<{
  recipients: MultiPayRecipient[]
  openIds?: number[]
}>()

const emit = defineEmits<{
  (e: 'add'): void
  (e: 'remove', id: number): void
  (e: 'update', id: number, newData: Partial<MultiPayRecipient>): void
  (e: 'toggle-open', id: number, open: boolean): void
}>()
</script>
