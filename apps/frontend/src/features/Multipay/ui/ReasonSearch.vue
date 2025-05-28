<template>
  <Combobox
    v-model="selectedComboboxValue"
    by="value"
    @update:open="(v) => (open = v)"
  >
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button
          :ref="triggerRefToUse"
          variant="outline"
          :class="cn('w-full justify-between border-0 h-10 font-normal rounded-lg', props.class)"
          :aria-expanded="open"
        >
          {{ selectedComboboxValue?.label ?? 'Select reason' }}
          <Icon :icon="'carbon:chevron-down'" class="opacity-50 ml-2 w-4 h-4 shrink-0" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList
      :class="cn('w-full', props.menuClass)"
      :style="{ width: menuWidth }"
    >
      <div class="py-1 pt-1 pb-0">
        <ComboboxInput
          v-model="searchQuery"
          class="w-full placeholder:opacity-50"
          placeholder="Search reason..."
          :disabled="isLoading"
        />
      </div>
      <template v-if="isLoading">
        <div class="p-2 text-center">
          <LoadingDots />
        </div>
      </template>
      <template v-else>
        <ComboboxEmpty v-if="filteredReasonOptions.length === 0">
          No reason found.
        </ComboboxEmpty>
        <ComboboxGroup v-else>
          <ComboboxItem
            v-for="reasonOpt in filteredReasonOptions"
            :key="reasonOpt.value"
            :value="reasonOpt"
            :class="cn(
              'flex justify-between items-center w-full hover:bg-gray-100',
              selectedComboboxValue?.value === reasonOpt.value ? 'bg-gray-100 font-medium' : ''
            )"
            @select="handleSelect(reasonOpt)"
          >
            {{ reasonOpt.label }}
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
        </ComboboxGroup>
      </template>
    </ComboboxList>
  </Combobox>
</template>

<script setup lang="ts">
import { ref, computed, watch, type Ref, type VNodeRef } from 'vue'
import { Check } from 'lucide-vue-next'
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
import {
  useReasonsForTransfer,
  type FEReasonForTransfer,
} from '@/features/Multipay/domain/useReasonsForTransfer'
import { useElementWidth } from '@/composables/useElementWidth'
import LoadingDots from '@/components/ui/LoadingDots.vue'
import { Icon } from '@iconify/vue'

// Transformed option type for the combobox
export type ReasonSearchOption = {
  label: string // from reason.text
  value: string // from reason.value
  allowFreeText: boolean
}

const props = defineProps<{
  modelValue: string | null // This will be the 'value' property of ReasonSearchOption
  class?: string
  menuClass?: string
  triggerRef?: any // For consistency with RecipientSearch
  dropdownWidthRef?: Ref<VNodeRef | null> | VNodeRef | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void // Emits the string value for v-model compatibility
  (e: 'reasonSelected', reason: ReasonSearchOption | null): void // Emits the full selected object
}>()

const { data: allReasonsFromAPI, isLoading, isError } = useReasonsForTransfer()

const searchQuery = ref('')
const open = ref(false)

const localTriggerRef = ref<HTMLElement | null>(null)
const triggerRefToUse = computed(() => props.triggerRef ?? localTriggerRef)

const menuWidth = computed(() => {
  const width = useElementWidth(props.dropdownWidthRef)
  return width.value ? `${width.value}px` : 'auto'
})

// Transform API reasons to ReasonSearchOption for the combobox
const reasonOptions = computed<ReasonSearchOption[]>(() => {
  return (
    allReasonsFromAPI.value?.map((r: FEReasonForTransfer) => ({
      label: r.text,
      value: r.value,
      allowFreeText: r.allowFreeText,
    })) || []
  )
})

const filteredReasonOptions = computed(() => {
  if (isLoading.value) return []
  if (isError.value || !reasonOptions.value) return []
  if (!searchQuery.value) {
    return reasonOptions.value.slice(0, 10)
  }
  return reasonOptions.value
    .filter((reason) =>
      reason.label.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
    .slice(0, 10)
})

// v-model for the Combobox, holds the full selected ReasonSearchOption object
const selectedComboboxValue = ref<ReasonSearchOption | null>(null)

// Watch for external changes to modelValue (string)
watch(
  () => props.modelValue,
  (newModelValue) => {
    if (newModelValue === null) {
      selectedComboboxValue.value = null
    } else {
      const correspondingOption = reasonOptions.value.find(
        (opt) => opt.value === newModelValue,
      )
      if (
        correspondingOption &&
        selectedComboboxValue.value?.value !== newModelValue
      ) {
        selectedComboboxValue.value = correspondingOption
      }
    }
  },
  { immediate: true }, // Ensure it runs on init to sync with initial modelValue
)

// Watch for internal changes to selectedComboboxValue (ReasonSearchOption object)
watch(selectedComboboxValue, (newVal) => {
  emit('update:modelValue', newVal?.value ?? null) // Emit the string value for v-model
  emit('reasonSelected', newVal) // Emit the full object
})

const handleSelect = (reasonOpt: ReasonSearchOption) => {
  selectedComboboxValue.value = reasonOpt
  open.value = false
}
</script>
