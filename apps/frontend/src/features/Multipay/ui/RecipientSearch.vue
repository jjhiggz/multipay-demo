<template>
  <Combobox v-model="selectedComboboxValue" by="value">
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button
          :ref="triggerRefToUse"
          variant="outline"
          :class="cn('w-full justify-between border-0 h-10 font-medium rounded-lg', props.class)"
        >
          {{ selectedComboboxValue?.label ?? 'Select recipient' }}
          <Icon :icon="'carbon:chevron-down'" class="opacity-50 ml-2 w-4 h-4 shrink-0" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList
      :class="cn('overflow-hidden box-border', props.menuClass)"
      :style="{ 
        width: menuWidth, 
        minWidth: menuWidth, 
        maxWidth: menuWidth,
        boxSizing: 'border-box'
      }"
    >
      <div class="py-1 pt-1 pb-0">
        <ComboboxInput
          v-model="search"
          class="w-full placeholder:opacity-50"
          placeholder="Search recipient..."
          :disabled="isLoading"
        />
      </div>

      <div class="max-h-[280px] overflow-y-auto overflow-x-hidden w-full">
        <template v-if="isLoading">
          <div class="p-2 text-center">
            <Loader2 class="mx-auto w-6 h-6 animate-spin" />
          </div>
        </template>
        <template v-else>
          <ComboboxEmpty v-if="filteredRecipients.validRecipients.length === 0 && filteredRecipients.invalidRecipients.length === 0">
            No recipient found.
          </ComboboxEmpty>
          <ComboboxGroup v-else>
            <!-- Valid recipients first -->
            <ComboboxItem
              v-for="recipient in filteredRecipients.validRecipients"
              :key="recipient.value"
              :value="recipient"
              :disabled="!recipient.isValid"
              :class="cn(
                'flex justify-between items-center w-full hover:bg-gray-100',
                selectedComboboxValue?.value === recipient.value ? 'bg-gray-100' : ''
              )"
            >
              <template v-if="!recipient.isValid && $slots['invalid-item']">
                <slot name="invalid-item" :recipient="recipient"></slot>
              </template>
              <template v-else>
                <div class="flex items-center">
                  <span :class="{ 
                    'opacity-50': !recipient.isValid,
                    'font-medium': selectedComboboxValue?.value === recipient.value
                  }">{{
                    recipient.label
                  }}</span>
                  <span
                    v-if="
                      !recipient.isValid &&
                      recipient.validationReason &&
                      !$slots['invalid-item']
                    "
                    class="ml-2 text-red-500 text-xs italic"
                  >
                    ({{ recipient.validationReason }})
                  </span>
                </div>
              </template>
              <ComboboxItemIndicator>
                <svg 
                  class="w-4 h-4 text-blue-500 ml-2 flex-shrink-0"
                  fill="currentColor" 
                  viewBox="0 0 32 32"
                >
                  <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm-2 20L7 15l1.4-1.4L14 19.2l9.6-9.6L25 11l-11 11z"/>
                </svg>
              </ComboboxItemIndicator>
            </ComboboxItem>
            
            <!-- Divider and invalid recipients section -->
            <template v-if="filteredRecipients.invalidRecipients.length > 0">
              <div class="border-t border-gray-200 my-1"></div>
              <div class="px-2 py-1 text-xs text-gray-500 font-medium whitespace-normal overflow-wrap-break-word hyphens-auto max-w-full box-border" style="word-wrap: break-word; overflow-wrap: break-word; width: 100%; box-sizing: border-box;">
                Not available recipients:
              </div>
              <ComboboxItem
                v-for="recipient in filteredRecipients.invalidRecipients"
                :key="recipient.value"
                :value="recipient"
                :disabled="!recipient.isValid"
                :class="cn(
                  'flex justify-between items-center w-full hover:bg-gray-100',
                  selectedComboboxValue?.value === recipient.value ? 'bg-gray-100' : ''
                )"
              >
                <template v-if="!recipient.isValid && $slots['invalid-item']">
                  <slot name="invalid-item" :recipient="recipient"></slot>
                </template>
                <template v-else>
                  <div class="flex items-center">
                    <span :class="{ 
                      'opacity-50': !recipient.isValid,
                      'font-medium': selectedComboboxValue?.value === recipient.value
                    }">{{
                      recipient.label
                    }}</span>
                    <span
                      v-if="
                        !recipient.isValid &&
                        recipient.validationReason &&
                        !$slots['invalid-item']
                      "
                      class="ml-2 text-red-500 text-xs italic"
                    >
                      ({{ recipient.validationReason }})
                    </span>
                  </div>
                </template>
                <ComboboxItemIndicator>
                  <svg 
                    class="w-4 h-4 text-blue-500 ml-2 flex-shrink-0"
                    fill="currentColor" 
                    viewBox="0 0 32 32"
                  >
                    <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm-2 20L7 15l1.4-1.4L14 19.2l9.6-9.6L25 11l-11 11z"/>
                  </svg>
                </ComboboxItemIndicator>
              </ComboboxItem>
            </template>
          </ComboboxGroup>
        </template>
      </div>
    </ComboboxList>
  </Combobox>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, type Ref, type VNodeRef } from 'vue'
import { Loader2 } from 'lucide-vue-next'
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
import type { CurrencyCode } from '@/constants/from-api/currency.constants'
import { Icon } from '@iconify/vue'

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
  const triggerElement = triggerRefToUse.value
  if (triggerElement && typeof triggerElement.getBoundingClientRect === 'function') {
    const rect = triggerElement.getBoundingClientRect()
    return `${rect.width}px`
  }
  const width = useElementWidth(props.dropdownWidthRef)
  return width.value ? `${width.value}px` : 'auto'
})

const { data: recipientsFromAPI, isLoading } = useRecipients()

// Transform API recipients to RecipientSearchOption for the combobox
const recipientOptions = computed<RecipientSearchOption[]>(() => {
  // Fake test data to demonstrate scrolling and disabled recipients
  const fakeRecipients = [
    { recipientId: 1, recipientDisplayName: 'Ms. Dawn Harvey', currencyCode: 'USD', bankCountryCode: 'US', bankName: 'Bank of America', accountNumber: '123456789' },
    { recipientId: 2, recipientDisplayName: 'Marlon Bahringer', currencyCode: 'USD', bankCountryCode: 'US', bankName: 'Chase Bank', accountNumber: '987654321' },
    { recipientId: 3, recipientDisplayName: 'Desiree Daugherty', currencyCode: 'USD', bankCountryCode: 'US', bankName: 'Wells Fargo', accountNumber: '456789123' },
    { recipientId: 4, recipientDisplayName: 'Gladys Yost', currencyCode: 'USD', bankCountryCode: 'US', bankName: 'Citibank', accountNumber: '789123456' },
    { recipientId: 5, recipientDisplayName: 'Angelina Schamberger', currencyCode: 'USD', bankCountryCode: 'US', bankName: 'TD Bank', accountNumber: '321654987' },
    { recipientId: 6, recipientDisplayName: 'Terence Yost III', currencyCode: 'USD', bankCountryCode: 'US', bankName: 'PNC Bank', accountNumber: '654987321' },
    { recipientId: 7, recipientDisplayName: 'Antoinette Mills I', currencyCode: 'USD', bankCountryCode: 'US', bankName: 'US Bank', accountNumber: '147258369' },
    { recipientId: 8, recipientDisplayName: 'Dr. Tyler Schmitt', currencyCode: 'USD', bankCountryCode: 'US', bankName: 'Capital One', accountNumber: '963852741' },
    // Disabled recipients (different currency)
    { recipientId: 9, recipientDisplayName: 'Claudia Bernier', currencyCode: 'EUR', bankCountryCode: 'FR', bankName: 'BNP Paribas', accountNumber: '111222333' },
    { recipientId: 10, recipientDisplayName: 'Dr. Raul Ullrich', currencyCode: 'GBP', bankCountryCode: 'GB', bankName: 'Barclays', accountNumber: '444555666' },
    { recipientId: 11, recipientDisplayName: 'Shannon Miller', currencyCode: 'CAD', bankCountryCode: 'CA', bankName: 'RBC', accountNumber: '777888999' },
    { recipientId: 12, recipientDisplayName: 'Lori Lockman', currencyCode: 'EUR', bankCountryCode: 'DE', bankName: 'Deutsche Bank', accountNumber: '000111222' },
    { recipientId: 13, recipientDisplayName: 'Flora Ullrich V', currencyCode: 'JPY', bankCountryCode: 'JP', bankName: 'Mitsubishi UFJ', accountNumber: '333444555' },
  ]

  return fakeRecipients.map((r) => {
    let validationResult:
      | { isValid: true }
      | { isValid: false; reason: string } = { isValid: true }
    if (props.validator) {
      validationResult = props.validator(r as FERecipient)
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
  })

  // Original API data (commented out for testing)
  /*
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
  */
})

const search = ref('')
const filteredRecipients = computed(() => {
  if (isLoading.value) return { validRecipients: [], invalidRecipients: [] }
  const baseOptions = recipientOptions.value
  let options = baseOptions
  
  if (search.value) {
    options = baseOptions.filter((r) => 
      r.label.toLowerCase().includes(search.value.toLowerCase())
    )
  }
  
  // Separate valid and invalid recipients
  const validRecipients = options.filter(r => r.isValid).slice(0, 8)
  const invalidRecipients = options.filter(r => !r.isValid).slice(0, 8)
  
  return { validRecipients, invalidRecipients }
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
