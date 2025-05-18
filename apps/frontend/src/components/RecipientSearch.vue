<template>
  <Combobox v-model="value" by="value">
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button variant="outline" class="justify-between w-[220px]">
          {{ value?.label ?? 'Select recipient' }}
          <ChevronsUpDown class="opacity-50 ml-2 w-4 h-4 shrink-0" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList class="w-[220px]">
      <ComboboxInput v-model="search" class="" placeholder="Search recipient..." />

      <ComboboxEmpty> No recipient found. </ComboboxEmpty>

      <ComboboxGroup>
        <ComboboxItem
          v-for="recipient in filteredRecipients"
          :key="recipient.value"
          :value="recipient"
        >
          {{ recipient.label }}
          <ComboboxItemIndicator>
            <Check :class="cn('ml-auto h-4 w-4')" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Check, ChevronsUpDown, Search } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import Button from './ui/button/Button.vue'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxTrigger,
} from '@/components/ui/combobox'
import { orpcVueQuery } from '../services/orpcClient'
import { authClient } from '../services/authClient'
import { useQuery } from '@tanstack/vue-query'
import type { CurrencyCode } from '@/constants/from-api/currency.constants'

const emit = defineEmits(['update:modelValue'])

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

const recipients = computed(() => {
  if (!recipientsData.value?.recipients) return []
  return recipientsData.value.recipients.map((r) => ({
    label: r.recipient.recipientDisplayName,
    value: String(r.recipient.recipientId),
    currencyCode: r.recipient.currencyCode as CurrencyCode,
    ...r.recipient,
  }))
})

const search = ref('')
const filteredRecipients = computed(() => {
  if (!search.value) return recipients.value.slice(0, 8)
  return recipients.value
    .filter((r) => r.label.toLowerCase().includes(search.value.toLowerCase()))
    .slice(0, 8)
})

const value = ref<(typeof recipients.value)[0] | null>(null)
</script>
