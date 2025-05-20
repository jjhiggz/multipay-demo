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
          :class="cn('w-full justify-between', props.class)"
          :aria-expanded="open"
        >
          {{ selectedComboboxValue?.label ?? 'Select reason' }}
          <ChevronsUpDown class="opacity-50 ml-2 w-4 h-4 shrink-0" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList
      :class="cn('w-full', props.menuClass)"
      :style="{ width: menuWidth }"
    >
      <ComboboxInput
        v-model="searchQuery"
        class="w-full"
        placeholder="Search reason..."
        :disabled="isLoading"
      />
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
            @select="handleSelect(reasonOpt)"
          >
            {{ reasonOpt.label }}
            <ComboboxItemIndicator>
              <Check :class="cn('ml-auto h-4 w-4')" />
            </ComboboxItemIndicator>
          </ComboboxItem>
        </ComboboxGroup>
      </template>
    </ComboboxList>
  </Combobox>
</template>

<script setup lang="ts">
import { ref, computed, watch, type Ref, type VNodeRef } from 'vue'
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
import {
  useReasonsForTransfer,
  type FEReasonForTransfer,
} from '@/features/Multipay/domain/useReasonsForTransfer'
import { useElementWidth } from '@/composables/useElementWidth'
import LoadingDots from '@/components/ui/LoadingDots.vue'

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
