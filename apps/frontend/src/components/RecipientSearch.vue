<template>
  <div ref="rootRef">
    <div
      v-if="selected && !editing"
      class="flex items-center gap-2 bg-white px-3 py-2 border rounded w-full"
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
      <SearchInput
        ref="searchInputRef"
        :model-value="selected"
        :options="recipientOptions"
        :placeholder="'Search recipient...'"
        :loading="isLoading"
        @update:modelValue="onSelect"
        @search="onSearch"
        :input-class="'w-full'"
        @keydown.native="onInputKeydown"
      >
        <template #option="{ option }">
          <div class="flex items-center gap-2">
            <Flag :currency-code="option.currencyCode" />
            <span class="font-medium">{{ option.label }}</span>
            <span class="text-gray-400 text-xs">({{ option.value }})</span>
          </div>
        </template>
      </SearchInput>
      <div v-if="isLoading" class="mt-1 text-gray-400 text-xs">Loading recipients...</div>
      <div v-if="error" class="mt-1 text-red-500 text-xs">Error loading recipients</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import SearchInput from './SearchInput.vue'
import { orpcVueQuery } from '../services/orpcClient'
import { authClient } from '../services/authClient'
import { useQuery } from '@tanstack/vue-query'
import Flag from './Flag.vue'
import { Icon } from '@iconify/vue'
import type { CurrencyCode } from '@/constants/from-api/currency.constants'

interface RecipientOption {
  label: string
  value: string | number
  recipientId: number
  currencyCode: CurrencyCode
  bankCountryCode: string
  bankName: string
  accountNumber: string
}

const selected = ref<RecipientOption | null>(null)
const backupSelected = ref<RecipientOption | null>(null)
const editing = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const searchInputRef = ref<any>(null)

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
      value: r.recipient.recipientId,
      recipientId: r.recipient.recipientId,
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

function onSelect(option: RecipientOption) {
  selected.value = option
  editing.value = false
  // emit for parent usage if needed
  // emit('update:modelValue', option)
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
  // If you want to emit an event or do additional cleanup on cancel, do it here
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

onBeforeUnmount(() => {
  window.removeEventListener('mousedown', onClickOutside)
})
</script>
