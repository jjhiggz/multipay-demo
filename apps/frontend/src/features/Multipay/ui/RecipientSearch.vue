<template>
  <Combobox v-model="selectedComboboxValue" by="value">
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button
          :ref="triggerRefToUse"
          variant="outline"
          :class="cn('w-full justify-between', props.class)"
        >
          {{ selectedComboboxValue?.label ?? 'Select recipient' }}
          <ChevronsUpDown class="opacity-50 ml-2 w-4 h-4 shrink-0" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList
      :class="cn('w-full', props.menuClass)"
      :style="{ width: menuWidth }"
    >
      <ComboboxInput
        v-model="search"
        class="w-full"
        placeholder="Search recipient..."
      />

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
import {
  useRecipients,
  type FERecipient,
} from '@/features/Multipay/domain/useRecipients'

const props = defineProps<{
  class?: string
  menuClass?: string
  triggerRef?: any
  dropdownWidthRef?: Ref<HTMLElement | null> | HTMLElement | null
}>()

// This is the transformed option type for the combobox internal state and for emitting
export type RecipientSearchOption = {
  label: string
  value: string
  recipientId: number
  currencyCode: string
  bankCountryCode: string
  bankName: string
  accountNumber: string
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: RecipientSearchOption | null): void
  (e: 'recipientSelected', value: RecipientSearchOption | null): void
}>()

const localTriggerRef = ref<HTMLElement | null>(null)
const triggerRefToUse = computed(() => props.triggerRef ?? localTriggerRef)
const menuWidth = computed(() => {
  const width = useElementWidth(props.dropdownWidthRef)
  return width.value ? `${width.value}px` : 'auto'
})

const { data: recipientsFromAPI } = useRecipients()

// Transform API recipients to RecipientSearchOption for the combobox
const recipientOptions = computed<RecipientSearchOption[]>(() => {
  return (
    recipientsFromAPI.value?.map((r: FERecipient) => ({
      label: r.recipientDisplayName,
      value: String(r.recipientId),
      recipientId: r.recipientId,
      currencyCode: r.currencyCode,
      bankCountryCode: r.bankCountryCode,
      bankName: r.bankName,
      accountNumber: r.accountNumber,
    })) || []
  )
})

const search = ref('')
const filteredRecipients = computed(() => {
  if (!search.value) return recipientOptions.value.slice(0, 8)
  return recipientOptions.value
    .filter((r) => r.label.toLowerCase().includes(search.value.toLowerCase()))
    .slice(0, 8)
})

// v-model for the Combobox, holds the full selected RecipientSearchOption object
const selectedComboboxValue = ref<RecipientSearchOption | null>(null)

watch(selectedComboboxValue, (newVal) => {
  emit('update:modelValue', newVal)
  emit('recipientSelected', newVal)
})
</script>
