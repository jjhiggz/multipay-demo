<template>
  <Dropdown
    :options="filteredOptions"
    :model-value="selectedValue"
    variant="outline"
    class="w-full"
    menuClass="max-h-60 overflow-y-auto"
    @update:modelValue="onSelect"
    @search="onSearch"
    @search-closed="searchClosed"
  >
    <template #display="{ option }">
      <template v-if="option">
        <Flag :currency-code="option.value" class="mr-2" />
        <b>{{ option.value }}</b>
      </template>
      <template v-else> Select... </template>
    </template>
    <template #option="{ option }">
      <div class="flex items-center gap-2">
        <Flag :currency-code="option.value" />
        {{ option.label }}
      </div>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Dropdown, { type BaseDropdownOption } from './Dropdown.vue'
import { VALID_CURRENCY_CODES, type CurrencyCode } from '../constants/from-api/currency.constants'
import Flag from './Flag.vue'

export interface CurrencyDropdownOption extends BaseDropdownOption {
  value: CurrencyCode
}

const props = defineProps<{ selected: CurrencyDropdownOption | null }>()
const emit = defineEmits<(e: 'selected', value: CurrencyDropdownOption) => void>()

const search = ref('')

const allOptions = computed<CurrencyDropdownOption[]>(() =>
  VALID_CURRENCY_CODES.map((c) => ({ label: c.name, value: c.code })),
)

const filteredOptions = computed(() => {
  if (!search.value) return allOptions.value
  const s = search.value.toLowerCase()
  return allOptions.value.filter(
    (o) => o.label.toLowerCase().includes(s) || o.value.toLowerCase().includes(s),
  )
})

const selectedValue = computed<CurrencyDropdownOption | null>(() => {
  if (!props.selected) return null
  return props.selected
})

const onSearch = (val: string) => {
  search.value = val
}

const onSelect = (option: CurrencyDropdownOption) => {
  const found = allOptions.value.find((o) => o.value === option.value)
  if (found) emit('selected', found)
}

const searchClosed = () => {
  search.value = ''
}
</script>
