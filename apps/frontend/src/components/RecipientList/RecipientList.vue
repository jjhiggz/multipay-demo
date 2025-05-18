<template>
  <div>
    <!-- Show when no recipients -->
    <div v-if="recipients.length === 0">
      <div>No recipients</div>
      <button @click="addRecipient">Add Recipient</button>
    </div>

    <!-- Desktop Table Layout -->
    <div v-if="recipients.length > 0" class="hidden md:block">
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
              v-for="recipient in recipients"
              :key="recipient.id"
              v-bind="recipient"
              @update="(data) => updateRecipient(recipient.id, data)"
              @remove="() => removeRecipient(recipient.id)"
            />
          </TableBody>
        </Table>
      </div>
      <div>
        <button @click="addRecipient">
          <Icon :icon="'carbon:add'" />
          Add Recipient
        </button>
      </div>
    </div>

    <!-- Mobile Collapsible Card Layout -->
    <div v-if="recipients.length > 0" class="md:hidden space-y-2 py-6 pt-0">
      <EditRecipientCard
        v-for="recipient in recipients"
        :key="recipient.id"
        v-bind="recipient"
        @update="(data) => updateRecipient(recipient.id, data)"
        @remove="() => removeRecipient(recipient.id)"
        class="mb-2"
      />
      <div>
        <button @click="addRecipient" class="flex items-center gap-2 mt-2">
          <Icon :icon="'carbon:add'" />
          Add Recipient
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import RecipientSearch from '@/components/RecipientSearch.vue'
import MoneyInput from '@/components/ui/MoneyInput.vue'
import EditRecipientRow from './EditRecipientRow.vue'
import EditRecipientCard from './EditRecipientCard.vue'
import type { CurrencyCode } from '@/constants/from-api/currency.constants'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'

type MultiPayRecipient = {
  id: number
  name: string
  amount: number | null
  reason: string
  currencyCode: CurrencyCode
  reference?: string
}

const recipients = ref<MultiPayRecipient[]>([
  { id: 1, name: 'John Doe', amount: 100, reason: 'Payment', currencyCode: 'USD', reference: '' }, // valid
  { id: 2, name: '', amount: null, reason: '', currencyCode: 'USD', reference: '' }, // invalid
  {
    id: 3,
    name: 'Robert Johnson',
    amount: 300,
    reason: 'Payment',
    currencyCode: 'USD',
    reference: '',
  }, // valid
])

const openIds = ref<number[]>([])

const isMultipayRecipientComplete = (recipient: MultiPayRecipient) =>
  recipient.name.trim() !== '' && recipient.amount !== null && recipient.reason.trim() !== ''

const toggleOpen = (id: number) =>
  (openIds.value = openIds.value.includes(id)
    ? openIds.value.filter((openId) => openId !== id)
    : [...openIds.value, id])

const addRecipient = () => {
  const nextId =
    recipients.value.length > 0 ? Math.max(...recipients.value.map((r) => r.id)) + 1 : 1
  recipients.value = [
    ...recipients.value,
    { id: nextId, name: '', amount: null, reason: '', currencyCode: 'USD', reference: '' },
  ]
}

const removeRecipient = (id: number) => {
  recipients.value = recipients.value.filter((r) => r.id !== id)
  openIds.value = openIds.value.filter((openId) => openId !== id)
}

const updateRecipient = (id: number, newData: Partial<MultiPayRecipient>) => {
  recipients.value = recipients.value.map((r) => (r.id === id ? { ...r, ...newData } : r))
}

const handleAmountInput = (e: Event, id: number) => {
  const target = e.target as HTMLInputElement | null
  if (target && target.value !== undefined) {
    updateRecipient(id, { amount: Number(target.value) })
  }
}

const myRef = ref(null)
</script>
