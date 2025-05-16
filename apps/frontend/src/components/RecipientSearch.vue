<template>
  <div ref="rootRef">
    <div
      v-if="selected && !editing"
      class="flex items-center gap-2 bg-white px-3 py-2 border rounded w-[220px] h-12"
    >
      <Flag :currency-code="selected.currencyCode" />
      <span class="font-medium">{{ selected.label }}</span>
      <button
        class="ml-auto text-blue-500 hover:text-blue-700"
        @click="startEditing"
        title="Edit recipient"
      >
        <Icon icon="carbon:edit" class="w-4 h-4" />
      </button>
    </div>
    <div v-else>
      <Combobox v-model="selectedId" @update:modelValue="onSelect" class="w-[220px]">
        <ComboboxAnchor class="w-[220px]">
          <ComboboxInput
            class="w-[220px] h-7"
            :placeholder="'Search recipient...'"
            :value="searchTerm"
            @input="onSearch($event.target.value)"
            @keydown="onInputKeydown"
            :disabled="isLoading"
          />
        </ComboboxAnchor>
        <ComboboxList :class="[props.menuClass, 'w-[220px]']">
          <ComboboxViewport class="w-[220px]">
            <ComboboxEmpty
              v-if="!recipientOptions.length && !isLoading"
              class="flex flex-col justify-center items-center bg-gray-50 px-4 py-6 text-gray-500"
            >
              <Icon icon="carbon:search" class="opacity-50 mb-2 w-8 h-8" />
              <span class="text-sm">No recipients found</span>
              <span class="mt-1 text-xs">Try a different search term</span>
            </ComboboxEmpty>
            <ComboboxItem
              v-for="option in recipientOptions"
              :key="option.recipientId"
              :value="option.recipientId"
              :class="[
                'flex items-center gap-2 px-3 py-2 cursor-pointer transition rounded w-[220px]',
                selectedId === option.recipientId
                  ? 'bg-purple-100 font-semibold'
                  : 'bg-white hover:bg-gray-50',
              ]"
            >
              <Flag :currency-code="option.currencyCode" class="shrink-0" />
              <span class="max-w-[120px] font-medium truncate">{{ option.label }}</span>
              <span class="text-gray-400 text-xs shrink-0">({{ option.value }})</span>
            </ComboboxItem>
          </ComboboxViewport>
        </ComboboxList>
        <div v-if="isLoading" class="mt-1 px-2 text-gray-400 text-xs">Loading recipients...</div>
        <div v-if="error" class="mt-1 px-2 text-red-500 text-xs">Error loading recipients</div>
      </Combobox>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxAnchor,
  ComboboxViewport,
} from '@/components/ui/combobox'
import { orpcVueQuery } from '../services/orpcClient'
import { authClient } from '../services/authClient'
import { useQuery } from '@tanstack/vue-query'
import Flag from './Flag.vue'
import { Icon } from '@iconify/vue'
import type { CurrencyCode } from '@/constants/from-api/currency.constants'

interface RecipientOption {
  label: string
  value: string
  recipientId: string
  currencyCode: CurrencyCode
  bankCountryCode: string
  bankName: string
  accountNumber: string
}

const props = defineProps<{
  menuClass?: string
}>()

const emit = defineEmits(['update:modelValue'])

const selectedId = ref<string>('')
const selected = ref<RecipientOption | null>(null)
const backupSelected = ref<RecipientOption | null>(null)
const editing = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const activeOrg = authClient.useActiveOrganization()
const organizationId = computed(() => activeOrg.value?.data?.id ?? '')
const options = computed(() =>
  orpcVueQuery.recipients.queryOptions({
    input: {
      organizationId: organizationId,
    },
  }),
)

const { data: recipientsData, isPending: isLoading, error } = useQuery(options)

const allOptions = computed<RecipientOption[]>(() => {
  if (!recipientsData.value?.recipients) return []
  return recipientsData.value.recipients.map((r) => {
    return {
      label: r.recipient.recipientDisplayName,
      value: String(r.recipient.recipientId),
      recipientId: String(r.recipient.recipientId),
      currencyCode: r.recipient.currencyCode as CurrencyCode,
      bankCountryCode: r.recipient.bankCountryCode,
      bankName: r.recipient.bankName,
      accountNumber: r.recipient.accountNumber,
    }
  })
})

const searchTerm = ref('')
const recipientOptions = computed(() => {
  if (!searchTerm.value) return allOptions.value
  return allOptions.value.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.value.toLowerCase()),
  )
})

function startEditing() {
  backupSelected.value = selected.value
  editing.value = true
  nextTick(() => {
    // Focus the input and move cursor to end
    const input = rootRef.value?.querySelector('input') as HTMLInputElement | null
    if (input) {
      input.focus()
      input.setSelectionRange(input.value.length, input.value.length)
    }
  })
}

function onSelect(id: string) {
  selectedId.value = id
  editing.value = false
}

function onSearch(term: string) {
  searchTerm.value = term
}

function onInputKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    handleEditCancel()
  }
}

function handleEditCancel() {
  revertSelection()
}

function revertSelection() {
  selected.value = backupSelected.value
  editing.value = false
}

function onClickOutside(e: MouseEvent) {
  if (editing.value && rootRef.value && !rootRef.value.contains(e.target as Node)) {
    handleEditCancel()
  }
}

watch(editing, (val) => {
  if (val) {
    window.addEventListener('mousedown', onClickOutside)
  } else {
    window.removeEventListener('mousedown', onClickOutside)
  }
})

watch(selectedId, (id) => {
  const found = allOptions.value.find((opt) => String(opt.recipientId) === id) || null
  selected.value = found
  if (found) emit('update:modelValue', found)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousedown', onClickOutside)
})
</script>
