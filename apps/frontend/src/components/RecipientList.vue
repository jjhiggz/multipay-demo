<template>
  <div>
    <!-- Show when no recipients -->
    <div v-if="recipients.length === 0" class="flex flex-col justify-center items-center py-8">
      <div class="mb-4 text-gray-500">No recipients</div>
      <button
        @click="addRecipient"
        class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
      >
        Add Recipient
      </button>
    </div>

    <!-- Desktop Table Layout -->
    <div v-if="recipients.length > 0" class="hidden md:block">
      <BetterScrollDiv class="h-96 overflow-y-scroll">
        <Table class="bg-white min-w-full">
          <TableHeader class="top-0 sticky bg-white">
            <TableRow class="bg-gray-900 h-12">
              <TableHead
                class="bg-gray-900 px-4 py-2 border-gray-800 border-b rounded-tl-lg font-semibold text-white text-left"
              >
                <!-- Status Icon Column -->
              </TableHead>
              <TableHead
                class="bg-gray-900 px-4 py-2 border-gray-800 border-b font-semibold text-white text-left"
              >
                Recipient
              </TableHead>
              <TableHead
                class="bg-gray-900 px-4 py-2 border-gray-800 border-b font-semibold text-white text-left"
              >
                Amount
              </TableHead>
              <TableHead
                class="bg-gray-900 px-4 py-2 border-gray-800 border-b font-semibold text-white text-left"
              >
                Reason
              </TableHead>
              <TableHead
                class="bg-gray-900 px-4 py-2 border-gray-800 border-b font-semibold text-white text-left"
              >
                Reference
              </TableHead>
              <TableHead
                class="bg-gray-900 px-4 py-2 border-gray-800 border-b rounded-tr-lg font-semibold text-white text-left"
              >
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="(recipient, idx) in recipients"
              :key="recipient.id"
              :class="[
                'h-14',
                idx === 0 ? 'border-b border-gray-200' : 'border-t border-b border-gray-200',
                'bg-white',
              ]"
            >
              <TableCell class="px-4">
                <span v-if="isMultipayRecipientComplete(recipient)">
                  <Icon
                    :icon="'carbon:dot-mark'"
                    class="w-5 h-5 text-blue-400"
                    :title="'Recipient complete'"
                  />
                </span>
                <span v-else>
                  <Icon
                    :icon="'carbon:dot-mark'"
                    class="w-5 h-5 text-gray-300"
                    :title="'Please complete this recipient'"
                  />
                </span>
              </TableCell>
              <TableCell class="px-4">
                <RecipientSearch
                  :menu-teleport-target="myRef"
                  @update:modelValue="
                    (option) =>
                      updateRecipient(recipient.id, {
                        name: option.label,
                        currencyCode: option.currencyCode,
                      })
                  "
                />
              </TableCell>
              <TableCell class="px-4">
                <AmountInput
                  class="w-36"
                  :model-value="recipient.amount"
                  :currency-code="recipient.currencyCode"
                  :disabled="false"
                  @update:model-value="
                    updateRecipient(recipient.id, { amount: parseFloat($event) })
                  "
                />
              </TableCell>
              <TableCell class="px-4">{{ recipient.reason || '—' }}</TableCell>
              <TableCell class="px-4 text-gray-400">Optional reference</TableCell>
              <TableCell class="px-4">
                <button
                  class="text-red-500 hover:text-red-700"
                  @click="removeRecipient(recipient.id)"
                  title="Remove Recipient"
                >
                  <Icon :icon="'carbon:trash-can'" class="w-5 h-5" />
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div id="dropdown-portal-root"></div>
      </BetterScrollDiv>
      <div class="flex justify-end mt-4">
        <button
          @click="addRecipient"
          class="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 shadow-sm px-4 py-2 border border-blue-200 rounded font-medium text-blue-700 text-sm transition-colors"
        >
          <Icon :icon="'carbon:add'" class="w-4 h-4" />
          Add Recipient
        </button>
      </div>
    </div>

    <!-- Mobile Collapsible Card Layout -->
    <div v-if="recipients.length > 0" class="md:hidden flex flex-col gap-4">
      <div
        v-for="recipient in recipients"
        :key="recipient.id"
        class="bg-white shadow-sm border border-gray-200 rounded-lg"
      >
        <button
          class="flex justify-between items-center px-4 py-3 focus:outline-none w-full"
          @click="toggleOpen(recipient.id)"
        >
          <div class="flex flex-1 items-center gap-2">
            <span v-if="isMultipayRecipientComplete(recipient)">
              <Icon
                :icon="'carbon:dot-mark'"
                class="w-5 h-5 text-blue-400"
                :title="'Recipient complete'"
              />
            </span>
            <span v-else>
              <Icon
                :icon="'carbon:dot-mark'"
                class="mr-2 w-5 h-5 text-gray-300"
                :title="'Please complete this recipient'"
              />
            </span>
            <span class="font-semibold">{{ recipient.name || '—' }}</span>
          </div>
          <div class="flex">
            <span class="font-semibold">{{
              recipient.amount !== null ? recipient.amount + ' USD' : '—'
            }}</span>
            <Icon
              :icon="'carbon:chevron-down'"
              :class="{ 'transform rotate-180': openIds.includes(recipient.id) }"
              class="ml-2 w-5 h-5 transition-transform"
            />
          </div>
        </button>
        <div v-if="openIds.includes(recipient.id)" class="px-4 pb-4">
          <div class="mb-2">
            <label class="block font-medium text-gray-700 text-sm">Recipient</label>
            <RecipientSearch
              :menu-teleport-target="myRef"
              @update:modelValue="
                (option) =>
                  updateRecipient(recipient.id, {
                    name: option.label,
                    currencyCode: option.currencyCode,
                  })
              "
            />
          </div>
          <div class="mb-2">
            <label class="block font-medium text-gray-700 text-sm">Amount</label>
            <AmountInput
              :model-value="recipient.amount"
              :currency-code="recipient.currencyCode"
              @update:model-value="updateRecipient(recipient.id, { amount: parseFloat($event) })"
              placeholder="Enter amount"
            />
          </div>
          <div class="mb-2">
            <label class="block font-medium text-gray-700 text-sm">Reason</label>
            <div class="mt-1">{{ recipient.reason || '—' }}</div>
          </div>
          <div class="mb-2">
            <label class="block font-medium text-gray-700 text-sm">Reference (Optional)</label>
            <div class="mt-1 text-gray-400">Optional reference</div>
          </div>
          <button
            class="flex justify-center items-center gap-2 bg-red-500 mt-2 py-2 rounded w-full text-white"
            @click="removeRecipient(recipient.id)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Remove Recipient
          </button>
        </div>
      </div>
      <div class="flex justify-start mt-4">
        <button
          @click="addRecipient"
          class="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 shadow-sm px-4 py-2 border border-blue-200 rounded font-medium text-blue-700 text-sm transition-colors"
        >
          <Icon :icon="'carbon:add'" class="w-4 h-4" />
          Add Recipient
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import BetterScrollDiv from './BetterScrollDiv.vue'
import RecipientSearch from './RecipientSearch.vue'
import AmountInput from './AmountInput.vue'
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
}

const recipients = ref<MultiPayRecipient[]>([
  { id: 1, name: 'John Doe', amount: 100, reason: 'Payment', currencyCode: 'USD' }, // valid
  { id: 2, name: '', amount: null, reason: '', currencyCode: 'USD' }, // invalid
  { id: 3, name: 'Robert Johnson', amount: 300, reason: 'Payment', currencyCode: 'USD' }, // valid
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
    { id: nextId, name: '', amount: null, reason: '', currencyCode: 'USD' },
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

<style scoped>
.incomplete-recipient {
  background-color: #f0f6ff !important;
  border-color: #b6d4fe !important;
}
</style>
