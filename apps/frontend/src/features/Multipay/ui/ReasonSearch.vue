<template>
  <Combobox v-model="selectedValue" by="value" @update:open="(v) => (open = v)">
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button
          :ref="localTriggerRef"
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
import { ref, computed, watch, type Ref, toValue, type VNodeRef } from 'vue'
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
  modelValue: string | null
  class?: string
  menuClass?: string
  dropdownWidthRef?: Ref<HTMLElement | null> | HTMLElement | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
  (e: 'reasonSelected', reason: FEReasonForTransfer | null): void
}>()

const { data: allReasons, isLoading, isError } = useReasonsForTransfer()

const searchQuery = ref('')
const open = ref(false)

const localTriggerRef = ref<VNodeRef | null>(null) // Ref for the internal Button component

const widthSourceRef = computed(() => {
  const externalElement = toValue(props.dropdownWidthRef)
  if (externalElement) return externalElement

  const triggerButtonComponentInstance = toValue(localTriggerRef.value)
  // If triggerButtonComponentInstance is a Vue component instance, its root DOM node is $el.
  // If it's already an HTMLElement (e.g. functional component exposing element directly),
  // or if $el is not available, we fall back to the instance itself hoping it's an element.
  return triggerButtonComponentInstance?.$el ?? triggerButtonComponentInstance
})

const menuWidth = computed(() => {
  const width = useElementWidth(
    widthSourceRef.value as HTMLElement | Ref<HTMLElement | null>,
  )
  return width.value ? `${width.value}px` : 'auto'
})

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
    return allReasons.value.slice(0, 10)
  }
  return allReasons.value
    .filter((reason) =>
      reason.text.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
    .slice(0, 10)
})

const handleSelect = (reason: FEReasonForTransfer) => {
  selectedValue.value = reason
  open.value = false
}

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
</script>
