<template>
  <button
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :disabled="disabled"
    @click="toggle"
    @keydown.space.prevent="toggle"
    @keydown.enter.prevent="toggle"
    :class="[
      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500',
      disabled
        ? modelValue
          ? 'bg-blue-200'
          : 'bg-gray-200'
        : modelValue
          ? 'bg-blue-600'
          : 'bg-gray-300',
      disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
    ]"
    tabindex="0"
  >
    <span
      :class="[
        'inline-block h-4 w-4 transform rounded-full shadow transition-transform transition-colors',
        disabled ? 'bg-gray-100' : 'bg-white',
        modelValue ? 'translate-x-5' : 'translate-x-1',
      ]"
    />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  disabled?: boolean
}>()
const emit = defineEmits(['update:modelValue'])

function toggle() {
  if (!props.disabled) emit('update:modelValue', !props.modelValue)
}
</script>
