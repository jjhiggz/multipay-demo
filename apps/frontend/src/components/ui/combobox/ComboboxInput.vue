<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SearchIcon } from 'lucide-vue-next'
import {
  ComboboxInput,
  type ComboboxInputEmits,
  type ComboboxInputProps,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<
  ComboboxInputProps & {
    class?: HTMLAttributes['class']
  }
>()

const emits = defineEmits<ComboboxInputEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <div data-slot="command-input-wrapper" class="flex items-center gap-2 px-3 border-b h-9">
    <SearchIcon class="opacity-50 size-4 shrink-0" />
    <ComboboxInput
      data-slot="command-input"
      :class="
        cn(
          'placeholder:text-muted-foreground flex w-full rounded-md bg-transparent py-1 text-sm outline-none border-0 disabled:cursor-not-allowed disabled:opacity-50',
          props.class,
        )
      "
      v-bind="{ ...forwarded, ...$attrs }"
    >
      <slot />
    </ComboboxInput>
  </div>
</template>
