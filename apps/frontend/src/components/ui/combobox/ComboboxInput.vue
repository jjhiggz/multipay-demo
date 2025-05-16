<script setup lang="ts">
import { cn } from '@/lib/utils'
import { SearchIcon } from 'lucide-vue-next'
import {
  ComboboxInput,
  type ComboboxInputEmits,
  type ComboboxInputProps,
  useForwardPropsEmits,
} from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<
  ComboboxInputProps & {
    class?: HTMLAttributes['class']
  }
>()

const emits = defineEmits<ComboboxInputEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <div
    data-slot="command-input-wrapper"
    class="flex items-center gap-2 bg-white px-3 py-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-400 transition"
  >
    <SearchIcon class="opacity-40 size-4 shrink-0" />
    <ComboboxInput
      data-slot="command-input"
      :class="
        cn(
          'placeholder:text-gray-400 flex  w-full bg-transparent text-sm outline-none border-0 focus:ring-0',
          props.class,
        )
      "
      v-bind="{ ...forwarded, ...$attrs }"
    >
      <slot />
    </ComboboxInput>
  </div>
</template>
