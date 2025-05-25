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
    <div
      v-if="props.recipients.length > 0"
      class="md:hidden space-y-2 py-6 pt-0"
    >
      <EditRecipientCard
        v-for="recipient in props.recipients"
        :key="recipient.index"
        v-bind="recipient"
        :open="props.openIds.includes(recipient.index)"
        @update="$emit('update', recipient.index, $event)"
        @remove="$emit('remove', recipient.index)"
        @update:open="$emit('toggle-open', recipient.id, $event)"
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

export type MultipayRecipientValues = {
  recipient: FERecipient | null
  amount: number | null
  reason: string | null
  reference: string | null
}

type ValidatorFn<T> = (input: T) =>
  | {
      isValid: true
      reasons: null
    }
  | {
      isValid: false
      reason: string
    }

export const multipayRecipientValidators: {
  [K in keyof MultipayRecipientValues]: ValidatorFn<MultipayRecipientValues[K]>
} = {
  recipient: (input: FERecipient | null) => {
    if (input === null) {
      return {
        isValid: false,
        reason: 'Please select recipient',
      }
    }
    return {
      isValid: !!input,
      reasons: null,
    }
  },
  amount: (input: number | null) => {
    if (typeof input !== 'number' || isNaN(input)) {
      return {
        isValid: false,
        reason: 'Please enter a valid amount',
      }
    }
    return {
      isValid: true,
      reasons: null,
    }
  },
  reason: (input: string | null) => {
    if (typeof input !== 'string' || input.length === 0) {
      return {
        isValid: false,
        reason: 'Please enter a reason',
      }
    }
    return {
      isValid: true,
      reasons: null,
    }
  },
  reference: (input: string | null) => {
    if (typeof input !== 'string') {
      return {
        isValid: false,
        reason: 'Please enter a valid reference',
      }
    }
    return {
      isValid: true,
      reasons: null,
    }
  },
}

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
}>()

const emit = defineEmits<{
  (e: 'add'): void
  (e: 'remove', id: number): void
  (e: 'update', id: number, newData: Partial<MultiPayRecipient>): void
  (e: 'toggle-open', id: number, open: boolean): void
}>()
</script>
