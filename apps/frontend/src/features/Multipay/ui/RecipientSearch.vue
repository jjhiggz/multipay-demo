<template>
  <Combobox v-model="value" by="value">
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button
          :ref="triggerRefToUse"
          variant="outline"
          :class="cn('w-full justify-between', props.class)"
        >
          {{ value?.label ?? 'Select recipient' }}
          <ChevronsUpDown class="opacity-50 ml-2 w-4 h-4 shrink-0" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList :class="cn('w-full', props.menuClass)" :style="{ width: menuWidth }">
      <ComboboxInput v-model="search" class="w-full" placeholder="Search recipient..." />

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
import { ref, computed, onMounted, watch, type Ref } from 'vue'
import { Check, ChevronsUpDown, Search } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
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
import Button from '@/components/ui/button/Button.vue'
import { useElementWidth } from '@/composables/useElementWidth'
import { useRecipients } from '@/features/Multipay/domain/useRecipients'

const props = defineProps<{
  class?: string
  menuClass?: string
  triggerRef?: any
  dropdownWidthRef?: Ref<HTMLElement | null> | HTMLElement | null
}>()

// Define the type for the emitted value
export type RecipientSearchOption = {
  label: string
  value: string
  recipientId: number
  currencyCode: string
  bankCountryCode: string
  bankName: string
  accountNumber: string
  [key: string]: any
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: (typeof recipients)[][number] | null): void
}>()

const localTriggerRef = ref<HTMLElement | null>(null)
const triggerRefToUse = computed(() => props.triggerRef ?? localTriggerRef)
const menuWidth = computed(() => {
  const width = useElementWidth(props.dropdownWidthRef)
  return width.value ? `${width.value}px` : 'auto'
})

const { recipients } = useRecipients()
const recipientOptions = computed(() => {
  return recipients.value.map((r) => ({
    label: r.recipient.recipientDisplayName,
    value: String(r.recipient.recipientId),
    ...r.recipient,
  }))
})

const search = ref('')
const filteredRecipients = computed(() => {
  if (!search.value) return recipientOptions.value.slice(0, 8)
  return recipientOptions.value
    .filter((r) => r.label.toLowerCase().includes(search.value.toLowerCase()))
    .slice(0, 8)
})

const value = ref<RecipientSearchOption | null>(null)

watch(value, (val) => {
  emit(
    'update:modelValue',
    val
      ? {
          label: val.label,
          value: val.value,
          recipientId: val.recipientId,
          currencyCode: val.currencyCode,
          bankCountryCode: val.bankCountryCode,
          bankName: val.bankName,
          accountNumber: val.accountNumber,
        }
      : null,
  )
})
</script>
