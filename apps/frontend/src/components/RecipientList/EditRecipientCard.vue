<script setup lang="ts">
import type { CurrencyCode } from '@/constants/from-api/currency.constants'
import { defineEmits, defineProps, ref } from 'vue'
import RecipientSearch from '@/components/RecipientSearch.vue'
import MoneyInput from '@/components/ui/MoneyInput.vue'
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  id: number
  name: string
  currencyCode: CurrencyCode
  amount: number | null
  reason: string
  reference?: string
}>()

const emit = defineEmits<{
  (e: 'update', data: Partial<typeof props>): void
  (e: 'remove'): void
}>()

const triggerRef = ref<HTMLElement | null>(null)
</script>

<template>
  <div class="bg-card shadow-sm p-4 border rounded-lg overflow-hidden text-card-foreground">
    <div class="mb-2 font-medium">{{ props.name || '—' }}</div>
    <div class="space-y-3">
      <div class="space-y-1">
        <label
          class="peer-disabled:opacity-70 font-medium text-muted-foreground text-xs peer-disabled:cursor-not-allowed"
          >Recipient</label
        >
        <RecipientSearch
          class="w-full"
          :trigger-ref="triggerRef"
          @update:modelValue="
            (option) =>
              emit('update', {
                name: option.label,
                currencyCode: option.currencyCode,
              })
          "
        />
      </div>
      <div class="space-y-1">
        <label
          class="peer-disabled:opacity-70 font-medium text-muted-foreground text-xs peer-disabled:cursor-not-allowed"
          >Amount</label
        >
        <MoneyInput
          :model-value="props.amount !== null ? props.amount : '0.00'"
          :currency="props.currencyCode"
          :disabled="false"
          :currency-selectable="false"
          @update:modelValue="(value) => emit('update', { amount: parseFloat(String(value)) })"
          class="w-full"
        />
      </div>
      <div class="space-y-1">
        <label
          class="peer-disabled:opacity-70 font-medium text-muted-foreground text-xs peer-disabled:cursor-not-allowed"
          >Reason</label
        >
        <input
          class="flex bg-background file:bg-transparent disabled:opacity-50 px-3 py-2 border border-input file:border-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 w-full h-10 file:font-medium placeholder:text-muted-foreground file:text-foreground md:text-sm file:text-sm text-base disabled:cursor-not-allowed"
          placeholder="Reason"
          :value="props.reason || ''"
          @input="(e) => emit('update', { reason: (e.target as HTMLInputElement)?.value || '' })"
        />
      </div>
      <div class="space-y-1">
        <label
          class="peer-disabled:opacity-70 font-medium text-muted-foreground text-xs peer-disabled:cursor-not-allowed"
          >Reference (Optional)</label
        >
        <input
          class="flex bg-background file:bg-transparent disabled:opacity-50 px-3 py-2 border border-input file:border-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 w-full h-10 file:font-medium placeholder:text-muted-foreground file:text-foreground md:text-sm file:text-sm text-base disabled:cursor-not-allowed"
          placeholder="Add a reference"
          :value="props.reference || ''"
          @input="(e) => emit('update', { reference: (e.target as HTMLInputElement)?.value || '' })"
        />
      </div>
      <div class="pt-2">
        <button
          class="inline-flex justify-center items-center gap-2 bg-destructive hover:bg-destructive/90 disabled:opacity-50 px-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 w-full h-9 [&_svg]:size-4 font-medium text-destructive-foreground text-sm whitespace-nowrap transition-colors [&_svg]:pointer-events-none disabled:pointer-events-none [&_svg]:shrink-0"
          @click="$emit('remove')"
        >
          <Icon :icon="'carbon:trash-can'" class="mr-2 w-4 h-4" />
          Remove Recipient
        </button>
      </div>
    </div>
  </div>
</template>
