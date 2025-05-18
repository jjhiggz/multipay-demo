<template>
  <div>
    <!-- Show when no recipients -->
    <div v-if="recipients.length === 0">
      <div>No recipients</div>
      <button @click="addRecipient">Add Recipient</button>
    </div>

    <!-- Desktop Table Layout -->
    <div v-if="recipients.length > 0" class="hidden md:block">
      <BetterScrollDiv>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <!-- Status Icon Column -->
              </TableHead>
              <TableHead> Recipient </TableHead>
              <TableHead> Amount </TableHead>
              <TableHead> Reason </TableHead>
              <TableHead> Reference </TableHead>
              <TableHead> Actions </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="(recipient, idx) in recipients" :key="recipient.id">
              <TableCell>
                <span v-if="isMultipayRecipientComplete(recipient)">
                  <Icon :icon="'carbon:dot-mark'" :title="'Recipient complete'" />
                </span>
                <span v-else>
                  <Icon :icon="'carbon:dot-mark'" :title="'Please complete this recipient'" />
                </span>
              </TableCell>
              <TableCell>
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
              <TableCell>
                <AmountInput
                  :model-value="recipient.amount"
                  :currency-code="recipient.currencyCode"
                  :disabled="false"
                  @update:model-value="
                    updateRecipient(recipient.id, { amount: parseFloat($event) })
                  "
                />
              </TableCell>
              <TableCell>{{ recipient.reason || '—' }}</TableCell>
              <TableCell>Optional reference</TableCell>
              <TableCell>
                <button @click="removeRecipient(recipient.id)" title="Remove Recipient">
                  <Icon :icon="'carbon:trash-can'" />
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div id="dropdown-portal-root"></div>
      </BetterScrollDiv>
      <div>
        <button @click="addRecipient">
          <Icon :icon="'carbon:add'" />
          Add Recipient
        </button>
      </div>
    </div>

    <!-- Mobile Collapsible Card Layout -->
    <div v-if="recipients.length > 0" class="md:hidden">
      <div v-for="recipient in recipients" :key="recipient.id">
        <button @click="toggleOpen(recipient.id)">
          <div>
            <span v-if="isMultipayRecipientComplete(recipient)">
              <Icon :icon="'carbon:dot-mark'" :title="'Recipient complete'" />
            </span>
            <span v-else>
              <Icon :icon="'carbon:dot-mark'" :title="'Please complete this recipient'" />
            </span>
            <span>{{ recipient.name || '—' }}</span>
          </div>
          <div>
            <span>{{ recipient.amount !== null ? recipient.amount + ' USD' : '—' }}</span>
            <Icon
              :icon="'carbon:chevron-down'"
              :class="{ 'transform rotate-180': openIds.includes(recipient.id) }"
            />
          </div>
        </button>
        <div v-if="openIds.includes(recipient.id)">
          <div>
            <label>Recipient</label>
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
          <div>
            <label>Amount</label>
            <AmountInput
              :model-value="recipient.amount"
              :currency-code="recipient.currencyCode"
              @update:model-value="updateRecipient(recipient.id, { amount: parseFloat($event) })"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label>Reason</label>
            <div>{{ recipient.reason || '—' }}</div>
          </div>
          <div>
            <label>Reference (Optional)</label>
            <div>Optional reference</div>
          </div>
          <button @click="removeRecipient(recipient.id)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
      <div>
        <button @click="addRecipient">
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
