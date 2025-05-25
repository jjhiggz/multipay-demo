<script setup lang="ts">
import type { CurrencyCode } from '@/constants/from-api/currency.constants'
import { defineEmits, defineProps, computed, ref, type VNodeRef } from 'vue'
import RecipientSearch, {
  type RecipientSearchOption,
} from '@/features/Multipay/ui/RecipientSearch.vue'
import MoneyInput from '@/features/Multipay/ui/MoneyInput.vue'
import { Icon } from '@iconify/vue'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ReasonSearch from '../ReasonSearch.vue'
import type { FERecipient } from '../../domain/useRecipients'
import type { MultipayRecipientValues } from './recipient-list.types'
import Flag from '@/components/Flag.vue'

const props = defineProps<{
  index: number
  values: MultipayRecipientValues
  open: boolean
  selectedCurrencyCode?: CurrencyCode | null
}>()

const emit = defineEmits<{
  (e: 'update', data: Partial<MultipayRecipientValues>): void
  (e: 'remove'): void
  (e: 'update:open', val: boolean): void
}>()

const formattedAmount = computed(() => {
  if (!props.values.amount || isNaN(props.values.amount)) return ''
  const currency =
    (props.values.recipient?.currencyCode as CurrencyCode) || 'USD'
  return (
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(props.values.amount) +
    ' ' +
    currency
  )
})

const handleReferenceInput = (e: Event) => {
  const value = (e.target as HTMLInputElement)?.value || ''
  emit('update', { reference: value })
}

const handleRecipientSelected = (
  selectedOption: RecipientSearchOption | null,
) => {
  if (selectedOption) {
    const newRecipient: FERecipient = {
      recipientId: selectedOption.recipientId,
      recipientDisplayName: selectedOption.label,
      currencyCode: selectedOption.currencyCode as CurrencyCode,
      bankCountryCode: selectedOption.bankCountryCode,
      bankName: selectedOption.bankName,
      accountNumber: selectedOption.accountNumber,
    }
    emit('update', { recipient: newRecipient })
  } else {
    emit('update', { recipient: null })
  }
}

const recipientSearchContainerRef = ref<VNodeRef | null>(null)
const reasonSearchContainerRef = ref<VNodeRef | null>(null)

const recipientValidator = computed(() => {
  return (
    recipient: FERecipient,
  ): { isValid: true } | { isValid: false; reason: string } => {
    if (
      props.selectedCurrencyCode &&
      recipient.currencyCode !== props.selectedCurrencyCode
    ) {
      return {
        isValid: false,
        reason: `Currency mismatch (needs ${props.selectedCurrencyCode})`,
      }
    }
    return { isValid: true }
  }
})
</script>

<template>
  <Collapsible
    :open="props.open"
    @update:open="(val) => emit('update:open', val)"
    class="bg-card shadow-sm mb-3 border border-gray-200 rounded-lg overflow-hidden"
  >
    <div
      class="flex justify-between items-center p-4 cursor-pointer"
      @click="emit('update:open', !props.open)"
    >
      <div class="font-medium">
        {{ props.values.recipient?.recipientDisplayName || 'New Recipient' }}
      </div>
      <div class="flex items-center">
        <div class="mr-2 font-medium">
          {{ formattedAmount || '-' }}
        </div>
        <CollapsibleTrigger as-child>
          <Button variant="ghost" size="icon" class="w-8 h-8" @click.stop>
            <Icon
              :icon="props.open ? 'carbon:chevron-up' : 'carbon:chevron-down'"
              class="w-4 h-4 text-gray-400"
            />
          </Button>
        </CollapsibleTrigger>
      </div>
    </div>

    <CollapsibleContent
      class="overflow-hidden"
      :class="props.open ? 'animate-accordion-down' : 'animate-accordion-up'"
    >
      <div class="space-y-3 px-4 pt-0 pb-4">
        <div class="space-y-1">
          <Label class="font-normal text-gray-500">Recipient</Label>
          <div ref="recipientSearchContainerRef" class="w-full">
            <RecipientSearch
              class="w-full"
              :initial-recipient="props.values.recipient"
              :dropdownWidthRef="recipientSearchContainerRef"
              @recipientSelected="handleRecipientSelected"
              :validator="recipientValidator"
            >
              <template #invalid-item="{ recipient: invalidRecipientInfo }">
                <div
                  class="flex justify-between items-center w-full"
                  :title="invalidRecipientInfo.validationReason"
                >
                  <span class="opacity-50">{{
                    invalidRecipientInfo.label
                  }}</span>
                  <Icon
                    icon="carbon:misuse"
                    class="ml-1 w-4 h-4 text-red-500"
                  />
                </div>
              </template>
            </RecipientSearch>
          </div>
        </div>

        <div class="space-y-1">
          <Label class="font-normal text-gray-500">Amount</Label>
          <MoneyInput
            :model-value="props.values.amount ?? 0"
            :currency="
              (props.values.recipient?.currencyCode as CurrencyCode) || 'USD'
            "
            :disabled="!props.values.recipient"
            :currency-selectable="false"
            @update:modelValue="
              (value) => emit('update', { amount: parseFloat(String(value)) })
            "
            class="w-full"
          />
        </div>

        <div class="space-y-1 w-full">
          <Label class="font-normal text-gray-500">Reason</Label>
          <ReasonSearch
            :model-value="props.values.reason"
            @update:modelValue="
              (newReason) => emit('update', { reason: newReason })
            "
            class="w-full"
            ref="reasonSearchContainerRef"
            :dropdownWidthRef="reasonSearchContainerRef"
          />
        </div>

        <div class="space-y-1">
          <Label class="font-normal text-gray-500">Reference (Optional)</Label>
          <Input
            placeholder="Add a reference"
            :value="props.values.reference || ''"
            @input="handleReferenceInput"
          />
        </div>

        <div class="pt-2">
          <Button variant="destructive" class="w-full" @click="emit('remove')">
            <Icon icon="carbon:trash-can" class="mr-2 w-4 h-4" />
            Remove Recipient
          </Button>
        </div>
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
