<template>
  <Combobox v-model="selectedValue" by="value" @update:open="(v) => (open = v)">
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button
          :ref="localTriggerRef as any"
          variant="outline"
          :class="cn('w-full justify-between', props.class)"
          :aria-expanded="open"
        >
          {{ selectedValue?.text ?? 'Select reason' }}
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
      />
      <ComboboxEmpty>No reason found.</ComboboxEmpty>
      <ComboboxGroup>
        <ComboboxItem
          v-for="reason in filteredReasons"
          :key="reason.value"
          :value="reason"
          @select="handleSelect(reason)"
        >
          {{ reason.text }}
          <ComboboxItemIndicator>
            <Check :class="cn('ml-auto h-4 w-4')" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>

<script setup lang="ts">
import { ref, computed, watch, type Ref, toValue } from 'vue'
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

const props = defineProps<{
  modelValue: string | null // The value of the selected reason (FEReasonForTransfer['value'])
  class?: string
  menuClass?: string
  dropdownWidthRef?: Ref<HTMLElement | null> | HTMLElement | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
  (e: 'reasonSelected', reason: FEReasonForTransfer | null): void
}>()

const { data: allReasons, isLoading, isError } = useReasonsForTransfer() // Add isLoading, isError if needed for UI

const searchQuery = ref('')
const open = ref(false) // To control combobox open state if needed, or rely on internal

// Ref for the internal trigger button
const localTriggerRef = ref<HTMLElement | null>(null)

// Calculate menu width based on the determined source ref
const menuWidth = computed(() => {
  const width = useElementWidth(props.dropdownWidthRef)
  return width.value ? `${width.value}px` : 'auto'
})

// The `v-model` of the Combobox will hold the full FEReasonForTransfer object
const selectedValue = computed<FEReasonForTransfer | null>({
  get() {
    return allReasons.value?.find((r) => r.value === props.modelValue) || null
  },
  set(reason: FEReasonForTransfer | null) {
    emit('update:modelValue', reason?.value ?? null)
    emit('reasonSelected', reason)
  },
})

const filteredReasons = computed(() => {
  if (isLoading.value || isError.value || !allReasons.value) return []
  if (!searchQuery.value) {
    return allReasons.value.slice(0, 10) // Show top 10 or all if less
  }
  return allReasons.value
    .filter((reason) =>
      reason.text.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
    .slice(0, 10)
})

// Handler for when an item is selected from the list
const handleSelect = (reason: FEReasonForTransfer) => {
  selectedValue.value = reason // This will trigger the computed setter
  open.value = false // Close the combobox
}

// Watch for external changes to modelValue to update internal selectedValue if needed
watch(
  () => props.modelValue,
  (newValue) => {
    const currentSelection = allReasons.value?.find((r) => r.value === newValue)
    if (
      currentSelection &&
      selectedValue.value?.value !== currentSelection.value
    ) {
      selectedValue.value = currentSelection
    }
    if (newValue === null && selectedValue.value !== null) {
      selectedValue.value = null
    }
  },
)

// Consider adding loading/error states in the template if desired
// For example, disable input or show a message within ComboboxList
</script>
