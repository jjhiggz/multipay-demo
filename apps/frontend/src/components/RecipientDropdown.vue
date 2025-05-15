<template>
  <Dropdown
    :options="recipientOptions"
    :model-value="selected"
    variant="outline"
    class="w-full"
    menuClass="max-h-60 overflow-y-auto"
    @update:modelValue="onSelect"
  >
    <template #display="{ option }">
      <template v-if="option">
        <Flag :currency-code="option.currencyCode" class="mr-2" />
        <span>{{ option.label }}</span>
      </template>
      <template v-else> Select recipient... </template>
    </template>
    <template #option="{ option }">
      <div class="flex items-center gap-2">
        <Flag :currency-code="option.currencyCode" />
        <span class="">{{ option.label }}</span>
      </div>
    </template>
    <template #footer>
      <button
        class="flex justify-center items-center gap-2 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded w-full font-medium text-blue-700 text-sm transition"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Add recipient
      </button>
    </template>
  </Dropdown>
  <div v-if="isLoading" class="mt-1 text-gray-400 text-xs">Loading recipients...</div>
  <div v-if="error" class="mt-1 text-red-500 text-xs">Error loading recipients</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Dropdown, { type BaseDropdownOption } from './Dropdown.vue'
import { orpcVueQuery } from '../services/orpcClient'
import { authClient } from '../services/authClient'
import { useQuery } from '@tanstack/vue-query'
import Flag from './Flag.vue'
import type { CurrencyCode } from '@/constants/from-api/currency.constants'

interface RecipientOption extends BaseDropdownOption {
  recipientId: number
  currencyCode: CurrencyCode
  bankCountryCode: string
  bankName: string
  accountNumber: string
}

const selected = ref<RecipientOption | null>(null)

const activeOrg = authClient.useActiveOrganization()
const organizationId = computed(() => activeOrg.value?.data?.id ?? '')
const options = computed(() =>
  orpcVueQuery.recipients.queryOptions({
    input: {
      organizationId: organizationId,
    },
  }),
)

const { data: recipientsData, isPending: isLoading, error } = useQuery(options)

const recipientOptions = computed<RecipientOption[]>(() => {
  if (!recipientsData.value?.recipients) return []
  return recipientsData.value.recipients.map((r) => {
    return {
      label: r.recipient.recipientDisplayName,
      value: r.recipient.recipientId,
      recipientId: r.recipient.recipientId,
      currencyCode: r.recipient.currencyCode as CurrencyCode,
      bankCountryCode: r.recipient.bankCountryCode,
      bankName: r.recipient.bankName,
      accountNumber: r.recipient.accountNumber,
    }
  })
})

function onSelect(option: RecipientOption) {
  selected.value = option
}
</script>
