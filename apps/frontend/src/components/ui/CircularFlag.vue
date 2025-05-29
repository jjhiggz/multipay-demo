<template>
  <div
    :class="[
      'inline-flex items-center justify-center rounded-full overflow-hidden',
      includeBorder ? 'border border-gray-100' : '',
    ]"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <Icon
      :icon="`flag:${countryCode}-4x3`"
      :width="computedSize"
      :height="computedSize"
      class="p-0.5"
    />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

const props = defineProps({
  currencyCode: {
    type: String,
    required: false,
    default: 'USD',
  },
  includeBorder: {
    type: Boolean,
    required: false,
    default: false,
  },
  size: {
    type: Number,
    required: false,
    default: 24,
  },
})

const countryCode = computed(() => {
  // countryCode (ISO 2) should be the first two letters of the currency code
  return props.currencyCode?.slice(0, 2).toLowerCase()
})

// reduce size slightly in order to compensate for different viewbox size of previous component
const computedSize = computed(() => {
  return props.size - 1
})
</script>
