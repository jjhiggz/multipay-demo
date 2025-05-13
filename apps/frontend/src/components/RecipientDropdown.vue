<template>
  <Dropdown
    :options="recipients"
    :model-value="selected"
    variant="outline"
    class="w-full"
    menuClass="max-h-60 overflow-y-auto"
    @update:modelValue="onSelect"
  >
    <template #option="{ option }">
      <div class="flex items-center gap-2">
        <span class="font-medium">{{ option.label }}</span>
        <span class="text-gray-400 text-xs">({{ option.value }})</span>
      </div>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Dropdown, { type BaseDropdownOption } from './Dropdown.vue'

interface RecipientOption extends BaseDropdownOption {
  // Add more fields as needed
}

const recipients = [
  { label: 'Alice Johnson', value: 'alice@example.com' },
  { label: 'Bob Smith', value: 'bob@example.com' },
  { label: 'Charlie Lee', value: 'charlie@example.com' },
]

const selected = ref<RecipientOption | null>(null)

function onSelect(option: RecipientOption) {
  selected.value = option
}
</script>
