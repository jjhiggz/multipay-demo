<script setup lang="ts">
import type { CurrencyCode } from '@/constants/from-api/currency.constants'
import { defineEmits, defineProps, computed, ref } from 'vue'
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

const props = defineProps<{
  id: number
  name: string
  currencyCode: CurrencyCode
  amount: number | null
  reason: string
  reference?: string
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update', data: Partial<Omit<typeof props, 'open'>>): void
  (e: 'remove'): void
  (e: 'update:open', val: boolean): void
}>()

const formattedAmount = computed(() => {
  if (!props.amount || isNaN(props.amount)) return ''
  return (
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: props.currencyCode,
    }).format(props.amount) +
    ' ' +
    props.currencyCode
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
    emit('update', {
      name: selectedOption.label,
      currencyCode: selectedOption.currencyCode as CurrencyCode,
    })
  }
}

const recipientSearchContainerRef = ref<HTMLElement | null>(null)
const reasonSearchContainerRef = ref<HTMLElement | null>(null)
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
      <div class="font-medium">{{ props.name || 'New Recipient' }}</div>
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
              :dropdownWidthRef="recipientSearchContainerRef"
              @recipientSelected="handleRecipientSelected"
            />
          </div>
        </div>

        <div class="space-y-1">
          <Label class="font-normal text-gray-500">Amount</Label>
          <MoneyInput
            :model-value="props.amount ?? 0"
            :currency="props.currencyCode"
            :disabled="false"
            :currency-selectable="false"
            @update:modelValue="
              (value) => emit('update', { amount: parseFloat(String(value)) })
            "
            class="w-full"
          />
        </div>

        <div class="space-y-1" ref="reasonSearchContainerRef">
          <Label class="font-normal text-gray-500">Reason</Label>
          <ReasonSearch
            :model-value="props.reason"
            @update:modelValue="
              (value: string | null) => emit('update', { reason: value || '' })
            "
            class="w-full"
            :dropdownWidthRef="reasonSearchContainerRef"
          />
        </div>

        <div class="space-y-1">
          <Label class="font-normal text-gray-500">Reference (Optional)</Label>
          <Input
            placeholder="Add a reference"
            :value="props.reference || ''"
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
