<template>
  <div>
    <!-- Show when no recipients -->
    <div
      v-if="props.recipients.length === 0"
      class="flex flex-col justify-center items-center gap-4 py-16 min-h-[200px]"
    >
      <div class="text-gray-500">No recipients added yet</div>
      <Button @click="$emit('add')" class="flex items-center transition-colors">
        + Add Recipient
      </Button>
    </div>

    <!-- Desktop Table Layout -->
    <div v-if="props.recipients.length > 0" class="hidden md:block">
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="pl-0"> Recipient </TableHead>
              <TableHead> Amount </TableHead>
              <TableHead> Reason </TableHead>
              <TableHead> Reference </TableHead>
              <TableHead> Actions </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <EditRecipientRow
              v-for="(recipient, idx) in props.recipients"
              :key="recipient.index"
              :index="recipient.index"
              :values="recipient.values"
              :selectedCurrencyCode="props.selectedCurrencyCode"
              :validationState="recipientValidationStates[idx]"
              @update="emit('update', recipient.index, $event)"
              @remove="$emit('remove', recipient.index)"
              @field-focus="
                (fieldName) =>
                  emit('recipient-field-focus', recipient.index, fieldName)
              "
              @field-blur="
                (fieldName) =>
                  emit('recipient-field-blur', recipient.index, fieldName)
              "
            />
          </TableBody>
        </Table>
      </div>
      <div class="flex justify-end mt-2 pt-0">
        <Button
          variant="link"
          @click="$emit('add')"
          class="flex items-center gap-2"
        >
          + Add Recipient
        </Button>
      </div>
    </div>

    <!-- Mobile Collapsible Card Layout -->
    <div
      v-if="props.recipients.length > 0"
      class="md:hidden space-y-2 py-6 pt-0"
    >
      <EditRecipientCard
        v-for="(recipient, idx) in props.recipients"
        :key="recipient.index"
        :index="recipient.index"
        :values="recipient.values"
        :open="props.openIds.includes(recipient.index)"
        :selectedCurrencyCode="props.selectedCurrencyCode"
        :validationState="recipientValidationStates[idx]"
        @update="$emit('update', recipient.index, $event)"
        @remove="$emit('remove', recipient.index)"
        @update:open="$emit('toggle-open', recipient.index, $event)"
        @field-focus="
          (fieldName) =>
            emit('recipient-field-focus', recipient.index, fieldName)
        "
        @field-blur="
          (fieldName) =>
            emit('recipient-field-blur', recipient.index, fieldName)
        "
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
import { defineProps, defineEmits, computed } from 'vue'
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
import type {
  MultiPayRecipientContainer,
  MultipayRecipientValidations,
  RecipientFields,
} from './recipient-list.types'
import type { CurrencyCode } from '@/constants/from-api/currency.constants'
import { getMultipayRecipientValidations } from './recipient-list.validators'

const props = defineProps<{
  recipients: MultiPayRecipientContainer[]
  openIds: number[]
  selectedCurrencyCode?: CurrencyCode | null
  hasFormBeenSubmitted?: boolean
}>()

const emit = defineEmits<{
  (e: 'add'): void
  (e: 'remove', index: number): void
  (
    e: 'update',
    index: number,
    newValues: Partial<MultiPayRecipientContainer['values']>,
  ): void
  (e: 'toggle-open', index: number, open: boolean): void
  (
    e: 'recipient-field-focus',
    recipientIndex: number,
    fieldName: keyof RecipientFields,
  ): void
  (
    e: 'recipient-field-blur',
    recipientIndex: number,
    fieldName: keyof RecipientFields,
  ): void
}>()

// Computed property for validation states
const recipientValidationStates = computed<MultipayRecipientValidations[]>(
  () => {
    return props.recipients.map((recipient) =>
      getMultipayRecipientValidations(
        recipient,
        // true,
        props.hasFormBeenSubmitted || false,
      ),
    )
  },
)
</script>
