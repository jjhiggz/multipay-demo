<template>
  <Dropdown
    :options="isLoading ? [] : filteredOptions"
    :model-value="selectedValue"
    variant="outline"
    :class="rootClass || 'w-full'"
    :menuClass="menuClass || 'max-h-60 overflow-y-auto'"
    @update:modelValue="onSelect"
    @search="onSearch"
    @search-closed="searchClosed"
    :disabled="isLoading"
  >
    <template #display="{ option }">
      <div :class="[displayClass, 'flex items-center']">
        <template v-if="option && !isLoading">
          <Flag :currency-code="option.value" class="mr-2" />
          {{ option.value }}
        </template>
        <template v-else-if="isLoading">
          <span class="text-muted-foreground text-sm">Loading...</span>
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
    <template #no-options>
      <div v-if="isLoading" class="p-2 text-center">
        <LoadingDots />
      </div>
      <div v-else class="p-4 text-muted-foreground text-sm text-center">
        No currencies found.
      </div>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { type CurrencyCode } from '../../../constants/from-api/currency.constants'
import { useCurrencies } from '../domain/useCurrencies'
import Flag from '@/components/Flag.vue'
import Dropdown, { type BaseDropdownOption } from '@/components/Dropdown.vue'
import LoadingDots from '@/components/ui/LoadingDots.vue'

export interface CurrencyDropdownOption extends BaseDropdownOption {
  value: CurrencyCode
}

const props = defineProps<{
  selected: CurrencyDropdownOption | null
  rootClass?: string
  menuClass?: string
  displayClass?: string
}>()
const emit =
  defineEmits<(e: 'selected', value: CurrencyDropdownOption) => void>()

const search = ref('')
const { data: currencies, isLoading, isError } = useCurrencies()

const allOptions = computed<CurrencyDropdownOption[]>(() =>
  (currencies.value || []).map((c) => ({
    label: c.name,
    value: c.isoCode as CurrencyCode,
  })),
)

const filteredOptions = computed(() => {
  if (isLoading.value || isError.value) return []
  if (!search.value) return allOptions.value
  const s = search.value.toLowerCase()
  return allOptions.value.filter(
    (o) =>
      o.label.toLowerCase().includes(s) || o.value.toLowerCase().includes(s),
  )
})

const selectedValue = computed<CurrencyDropdownOption | null>(() => {
  if (!props.selected || isLoading.value) return null // Don't show selected if loading
  return props.selected
})

const onSearch = (val: string) => {
  search.value = val
}

const onSelect = (option: CurrencyDropdownOption) => {
  if (isLoading.value) return
  const found = allOptions.value.find((o) => o.value === option.value)
  if (found) emit('selected', found)
}

const searchClosed = () => {
  search.value = ''
}
</script>
