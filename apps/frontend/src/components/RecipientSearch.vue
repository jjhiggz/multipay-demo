<template>
  <SearchInput
    :model-value="selected"
    :options="recipientOptions"
    :placeholder="'Search recipient...'"
    :loading="isLoading"
    @update:modelValue="onSelect"
    @search="onSearch"
    :input-class="'w-full'"
  >
    <template #option="{ option }">
      <div class="flex items-center gap-2">
        <Flag :currency-code="option.currencyCode" />
        <span class="font-medium">{{ option.label }}</span>
        <span class="text-gray-400 text-xs">({{ option.value }})</span>
      </div>
    </template>
  </SearchInput>
  <div v-if="isLoading" class="mt-1 text-gray-400 text-xs">Loading recipients...</div>
  <div v-if="error" class="mt-1 text-red-500 text-xs">Error loading recipients</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SearchInput from './SearchInput.vue'
import { orpcVueQuery } from '../services/orpcClient'
import { authClient } from '../services/authClient'
import { useQuery } from '@tanstack/vue-query'
import Flag from './Flag.vue'
import type { CurrencyCode } from '@/constants/from-api/currency.constants'

interface RecipientOption {
  label: string
  value: string | number
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

const allOptions = computed<RecipientOption[]>(() => {
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

const searchTerm = ref('')
const recipientOptions = computed(() => {
  if (!searchTerm.value) return allOptions.value
  return allOptions.value.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.value.toLowerCase()),
  )
})

function onSelect(option: RecipientOption) {
  selected.value = option
  // emit for parent usage if needed
  // emit('update:modelValue', option)
}

function onSearch(term: string) {
  searchTerm.value = term
}
</script>
