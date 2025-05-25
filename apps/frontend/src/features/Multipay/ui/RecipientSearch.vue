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
        :disabled="isLoading"
      />

      <template v-if="isLoading">
        <div class="p-2 text-center">
          <LoadingDots />
        </div>
      </template>
      <template v-else>
        <ComboboxEmpty v-if="filteredRecipients.length === 0">
          No recipient found.
        </ComboboxEmpty>
        <ComboboxGroup v-else>
          <ComboboxItem
            v-for="recipient in filteredRecipients"
            :key="recipient.value"
            :value="recipient"
            :disabled="!recipient.isValid"
          >
            {{ recipient.label }}
            <span
              v-if="!recipient.isValid && recipient.validationReason"
              class="ml-2 text-red-500 text-xs italic"
            >
              ({{ recipient.validationReason }})
            </span>
            <ComboboxItemIndicator>
              <Check
                :class="
                  cn('ml-auto h-4 w-4', { 'opacity-50': !recipient.isValid })
                "
              />
            </ComboboxItemIndicator>
          </ComboboxItem>
        </ComboboxGroup>
      </template>
    </ComboboxList>
  </Combobox>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, type Ref, type VNodeRef } from 'vue'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
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
import LoadingDots from '@/components/ui/LoadingDots.vue'

const props = defineProps<{
  class?: string
  menuClass?: string
  triggerRef?: any
  dropdownWidthRef?: Ref<VNodeRef | null> | VNodeRef | null
  validator?: (
    recipient: FERecipient,
  ) => { isValid: true } | { isValid: false; reason: string }
  initialRecipient?: FERecipient | null
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
  isValid: boolean
  validationReason?: string
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

const { data: recipientsFromAPI, isLoading } = useRecipients()

// Transform API recipients to RecipientSearchOption for the combobox
const recipientOptions = computed<RecipientSearchOption[]>(() => {
  return (
    recipientsFromAPI.value?.map((r: FERecipient) => {
      let validationResult:
        | { isValid: true }
        | { isValid: false; reason: string } = { isValid: true }
      if (props.validator) {
        validationResult = props.validator(r)
      }
      return {
        label: r.recipientDisplayName,
        value: String(r.recipientId),
        recipientId: r.recipientId,
        currencyCode: r.currencyCode,
        bankCountryCode: r.bankCountryCode,
        bankName: r.bankName,
        accountNumber: r.accountNumber,
        isValid: validationResult.isValid,
        validationReason: !validationResult.isValid
          ? validationResult.reason
          : undefined,
      }
    }) || []
  )
})

const search = ref('')
const filteredRecipients = computed(() => {
  if (isLoading.value) return []
  const baseOptions = recipientOptions.value
  if (!search.value) return baseOptions.slice(0, 8)
  return baseOptions
    .filter((r) => r.label.toLowerCase().includes(search.value.toLowerCase()))
    .slice(0, 8)
})

// v-model for the Combobox, holds the full selected RecipientSearchOption object
const selectedComboboxValue = ref<RecipientSearchOption | null>(null)

watch(
  () => props.initialRecipient,
  (newInitial) => {
    if (newInitial) {
      const foundOption = recipientOptions.value.find(
        (opt) => opt.recipientId === newInitial.recipientId,
      )
      if (foundOption) {
        selectedComboboxValue.value = foundOption
      } else {
        let validationResult:
          | { isValid: true }
          | { isValid: false; reason: string } = { isValid: true }
        if (props.validator) {
          validationResult = props.validator(newInitial)
        }
        selectedComboboxValue.value = {
          label: newInitial.recipientDisplayName,
          value: String(newInitial.recipientId),
          recipientId: newInitial.recipientId,
          currencyCode: newInitial.currencyCode,
          bankCountryCode: newInitial.bankCountryCode,
          bankName: newInitial.bankName,
          accountNumber: newInitial.accountNumber,
          isValid: validationResult.isValid,
          validationReason: !validationResult.isValid
            ? validationResult.reason
            : undefined,
        }
      }
    } else {
      selectedComboboxValue.value = null
    }
  },
  { immediate: true },
)

watch(selectedComboboxValue, (newVal) => {
  if (newVal === null || newVal.isValid) {
    emit('update:modelValue', newVal)
    emit('recipientSelected', newVal)
  } else if (newVal && !newVal.isValid) {
    selectedComboboxValue.value = null
    emit('recipientSelected', null)
  }
})
</script>
