<template>
  <Dropdown
    :options="filteredOptions"
    :model-value="selectedValue"
    variant="outline"
    :class="rootClass || 'w-full'"
    :menuClass="menuClass || 'max-h-60 overflow-y-auto'"
    @update:modelValue="onSelect"
    @search="onSearch"
    @search-closed="searchClosed"
  >
    <template #display="{ option }">
      <div :class="[displayClass, 'flex']">
        <template v-if="option">
          <Flag :currency-code="option.value" class="mr-2" />
          {{ option.value }}
        </template>
        <template v-else> Select... </template>
      </div>
    </template>
    <template #option="{ option }">
      <div class="flex items-center gap-2">
        <Flag :currency-code="option.value" />
        {{ option.value }}
      </div>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Dropdown, { type BaseDropdownOption } from './Dropdown.vue'
import { type CurrencyCode } from '../constants/from-api/currency.constants'
import Flag from './Flag.vue'
import { useCurrencies } from '../composables/useCurrencies'

export interface CurrencyDropdownOption extends BaseDropdownOption {
  value: CurrencyCode
}

const props = defineProps<{
  selected: CurrencyDropdownOption | null
  rootClass?: string
  menuClass?: string
  displayClass?: string
}>()
const emit = defineEmits<(e: 'selected', value: CurrencyDropdownOption) => void>()

const search = ref('')

const { currencies, isLoading } = useCurrencies()

const allOptions = computed<CurrencyDropdownOption[]>(() =>
  (currencies.value || []).map((c) => ({ label: c.name, value: c.isoCode as CurrencyCode })),
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
