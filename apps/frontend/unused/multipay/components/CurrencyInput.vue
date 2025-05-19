<script setup lang="ts">
import { ref, watch } from 'vue'
import Input from '@/components/ui/input/Input.vue'

const props = defineProps<{
  modelValue: number
  currency: string
  class?: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const displayValue = ref('')
const isEditing = ref(false)

const formatValue = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)
}

// Update displayValue when modelValue changes or editing state changes
watch(
  () => [props.modelValue, isEditing.value],
  ([value, editing]) => {
    if (!editing) {
      displayValue.value = formatValue(value as number)
    }
  },
  { immediate: true },
)

const handleFocus = () => {
  isEditing.value = true
}

const handleChange = (e: Event) => {
  let inputValue = (e.target as HTMLInputElement).value
  inputValue = inputValue.replace(/[^0-9.]/g, '')
  const parts = inputValue.split('.')
  if (parts.length > 2) {
    inputValue = parts[0] + '.' + parts.slice(1).join('')
  }
  displayValue.value = inputValue
  if (inputValue !== '' && !isNaN(Number(inputValue))) {
    emits('update:modelValue', Number(inputValue))
  } else if (inputValue === '' || inputValue === '.') {
    emits('update:modelValue', 0)
  }
}

const handleBlur = () => {
  isEditing.value = false
  displayValue.value = formatValue(props.modelValue)
}
</script>

<template>
  <div class="relative">
    <Input
      type="text"
      :value="displayValue"
      @input="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      :class="`pr-12 text-right ${props.class ?? ''}`"
    />
    <div
      class="right-0 absolute inset-y-0 flex items-center pr-3 text-muted-foreground pointer-events-none"
    >
      {{ props.currency }}
    </div>
  </div>
</template>
