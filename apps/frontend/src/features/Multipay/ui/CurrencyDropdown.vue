<template>
  <Dropdown
    :options="isLoading ? [] : filteredOptions"
    :model-value="selectedValue"
    :variant="variant"
    :class="([rootClass || 'w-full', variant === 'borderless' ? 'dropdown-borderless' : '']).join(' ')"
    :menuClass="menuClass || 'max-h-60 overflow-y-auto'"
    @update:modelValue="onSelect"
    @search="onSearch"
    @search-closed="searchClosed"
    :disabled="isLoading"
  >
    <template #display="{ open }">
      <div class="flex items-center bg-gray-50 rounded-lg px-4 py-3 gap-3 w-full max-w-xs">
        <Flag v-if="selectedValue && !isLoading" :currency-code="selectedValue.value" class="w-6 h-6 flex-shrink-0" />
        <div v-else class="w-6 h-6 flex-shrink-0"></div>
        <div>
          <div class="text-gray-500 text-xs mb-0.5">{{ label }}</div>
          <div class="flex items-center gap-1">
            <div v-if="isLoading" class="h-6 flex items-center">
              <span class="h-4 bg-gray-200 rounded animate-pulse w-[1.5rem]"></span>
            </div>
            <span v-else :class="usdClass || 'text-lg font-bold text-gray-900'">{{ selectedValue ? selectedValue.value : '' }}</span>
            <Icon :icon="'carbon:chevron-down'" :class="['w-5 h-5 text-gray-400 transition-transform duration-200', open ? 'rotate-180' : '']" />
          </div>
        </div>
      </div>
    </template>
    <template #option="{ option, selected }">
      <div class="flex items-center gap-2">
        <Flag :currency-code="option.value" />
        <span :class="{ 'font-medium': selected }">{{ option.value }}</span>
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
import { Icon } from '@iconify/vue'

export interface CurrencyDropdownOption extends BaseDropdownOption {
  value: CurrencyCode
}

const props = defineProps<{
  selected: CurrencyDropdownOption | null
  rootClass?: string
  menuClass?: string
  displayClass?: string
  label?: string
  usdClass?: string
  variant?: string
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

const isBorderless = computed(() => props.variant === 'borderless')

const isOpen = ref(false)
</script>

<style scoped>
.dropdown-borderless .dropdown-chevron {
  display: none !important;
}
</style>
