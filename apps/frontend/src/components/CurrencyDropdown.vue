<template>
  <Dropdown
    :options="filteredOptions"
    :model-value="selectedValue"
    variant="outline"
    class="w-full"
    menuClass="max-h-60 overflow-y-auto"
    @update:modelValue="onSelect"
    @search="onSearch"
  >
    <template #option="{ option }">
      <div>
        <b>{{ option.value }}</b> {{ option.label }}
      </div>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Dropdown from './Dropdown.vue'
import { VALID_CURRENCY_CODES } from '../constants/from-api/currency.constants'

interface Option {
  label: string
  value: string
}

const props = defineProps<{ selected?: string | Option }>()
const emit = defineEmits<(e: 'selected', value: Option) => void>()

const search = ref('')

const allOptions = computed<Option[]>(() =>
  VALID_CURRENCY_CODES.map((c) => ({ label: c.name, value: c.code })),
)

const filteredOptions = computed(() => {
  if (!search.value) return allOptions.value
  const s = search.value.toLowerCase()
  return allOptions.value.filter(
    (o) => o.label.toLowerCase().includes(s) || o.value.toLowerCase().includes(s),
  )
})

const selectedValue = computed(() => {
  if (!props.selected) return null
  if (typeof props.selected === 'string') return props.selected
  return props.selected.value
})

const onSearch = (val: string) => {
  search.value = val
}

const onSelect = (code: string) => {
  const found = allOptions.value.find((o) => o.value === code)
  if (found) emit('selected', found)
}
</script>
