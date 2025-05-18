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
              <TableHead></TableHead>
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
                    (value) => updateRecipient(recipient.id, { amount: parseFloat(value) })
                  "
                />
              </TableCell>
              <TableCell>{{ recipient.reason || '—' }}</TableCell>
              <TableCell>
                <input
                  :value="recipient.reference || ''"
                  @input="
                    (e) =>
                      updateRecipient(recipient.id, {
                        reference: (e.target as HTMLInputElement)?.value || '',
                      })
                  "
                />
              </TableCell>
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
    <div v-if="recipients.length > 0" class="md:hidden space-y-2 p-6 pt-0">
      <div
        v-for="(recipient, idx) in recipients"
        :key="recipient.id"
        class="bg-card shadow-sm border rounded-lg overflow-hidden text-card-foreground"
      >
        <div :data-state="openIds.includes(recipient.id) ? 'open' : 'closed'">
          <div
            class="flex justify-between items-center p-4 cursor-pointer"
            @click="toggleOpen(recipient.id)"
          >
            <div class="font-medium">{{ recipient.name || '—' }}</div>
            <div class="flex items-center">
              <div class="mr-2 font-medium">
                {{
                  recipient.amount !== null
                    ? `$${recipient.amount.toFixed(2)} ${recipient.currencyCode}`
                    : '—'
                }}
              </div>
              <button
                class="inline-flex justify-center items-center gap-2 hover:bg-accent disabled:opacity-50 p-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 w-8 h-8 [&_svg]:size-4 font-medium text-sm whitespace-nowrap transition-colors hover:text-accent-foreground [&_svg]:pointer-events-none disabled:pointer-events-none [&_svg]:shrink-0"
                type="button"
                :aria-controls="`collapsible-content-${recipient.id}`"
                :aria-expanded="openIds.includes(recipient.id)"
                :data-state="openIds.includes(recipient.id) ? 'open' : 'closed'"
                tabindex="-1"
              >
                <svg
                  v-if="openIds.includes(recipient.id)"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-4 h-4 lucide lucide-chevron-up"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-4 h-4 lucide lucide-chevron-down"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>
          </div>
          <div
            v-show="openIds.includes(recipient.id)"
            :id="`collapsible-content-${recipient.id}`"
            class="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
            :data-state="openIds.includes(recipient.id) ? 'open' : 'closed'"
          >
            <div class="space-y-3 p-6 px-4 pt-0 pb-4">
              <div class="space-y-1">
                <label
                  class="peer-disabled:opacity-70 font-medium text-muted-foreground text-xs peer-disabled:cursor-not-allowed"
                  :for="`recipient-row-${idx}`"
                  >Recipient</label
                >
                <RecipientSearch
                  :menu-teleport-target="myRef"
                  @update:modelValue="
                    (option) =>
                      updateRecipient(recipient.id, {
                        name: option.label,
                        currencyCode: option.currencyCode,
                      })
                  "
                  :id="`recipient-row-${idx}`"
                />
              </div>
              <div class="space-y-1">
                <label
                  class="peer-disabled:opacity-70 font-medium text-muted-foreground text-xs peer-disabled:cursor-not-allowed"
                  :for="`amount-row-${idx}`"
                  >Amount</label
                >
                <div class="relative">
                  <input
                    class="flex bg-background file:bg-transparent disabled:opacity-50 px-3 py-2 pr-12 border border-input file:border-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 w-full h-10 file:font-medium placeholder:text-muted-foreground file:text-foreground md:text-sm file:text-sm text-base text-right disabled:cursor-not-allowed"
                    type="text"
                    :value="recipient.amount !== null ? recipient.amount.toFixed(2) : ''"
                    @input="
                      (e) =>
                        updateRecipient(recipient.id, {
                          amount: parseFloat((e.target as HTMLInputElement)?.value || ''),
                        })
                    "
                    :id="`amount-row-${idx}`"
                  />
                  <div
                    class="right-0 absolute inset-y-0 flex items-center pr-3 text-muted-foreground pointer-events-none"
                  >
                    {{ recipient.currencyCode }}
                  </div>
                </div>
              </div>
              <div class="space-y-1">
                <label
                  class="peer-disabled:opacity-70 font-medium text-muted-foreground text-xs peer-disabled:cursor-not-allowed"
                  :for="`reason-row-${idx}`"
                  >Reason</label
                >
                <button
                  type="button"
                  role="combobox"
                  class="flex justify-between items-center bg-background disabled:opacity-50 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring ring-offset-background focus:ring-offset-2 w-full h-10 placeholder:text-muted-foreground text-sm [&>span]:line-clamp-1 disabled:cursor-not-allowed"
                  :id="`reason-row-${idx}`"
                  @click="
                    () => {
                      /* TODO: open reason select */
                    }
                  "
                >
                  <span style="pointer-events: none">{{ recipient.reason || '—' }}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="opacity-50 w-4 h-4 lucide lucide-chevron-down"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
              </div>
              <div class="space-y-1">
                <label
                  class="peer-disabled:opacity-70 font-medium text-muted-foreground text-xs peer-disabled:cursor-not-allowed"
                  :for="`reference-row-${idx}`"
                  >Reference (Optional)</label
                >
                <input
                  class="flex bg-background file:bg-transparent disabled:opacity-50 px-3 py-2 border border-input file:border-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 w-full h-10 file:font-medium placeholder:text-muted-foreground file:text-foreground md:text-sm file:text-sm text-base disabled:cursor-not-allowed"
                  :id="`reference-row-${idx}`"
                  placeholder="Add a reference"
                  :value="recipient.reference || ''"
                  @input="
                    (e) =>
                      updateRecipient(recipient.id, {
                        reference: (e.target as HTMLInputElement)?.value || '',
                      })
                  "
                />
              </div>
              <div class="pt-2">
                <button
                  class="inline-flex justify-center items-center gap-2 bg-destructive hover:bg-destructive/90 disabled:opacity-50 px-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 w-full h-9 [&_svg]:size-4 font-medium text-destructive-foreground text-sm whitespace-nowrap transition-colors [&_svg]:pointer-events-none disabled:pointer-events-none [&_svg]:shrink-0"
                  @click="removeRecipient(recipient.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="mr-2 w-4 h-4 lucide lucide-trash2"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    <line x1="10" x2="10" y1="11" y2="17"></line>
                    <line x1="14" x2="14" y1="11" y2="17"></line>
                  </svg>
                  Remove Recipient
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
