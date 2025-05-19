<template>
  <Combobox v-model="value" by="value">
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button
          :ref="triggerRefToUse"
          variant="outline"
          :class="cn('w-full justify-between', props.class)"
        >
          {{ value?.label ?? 'Select recipient' }}
          <ChevronsUpDown class="opacity-50 ml-2 w-4 h-4 shrink-0" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList :class="cn('w-full', props.menuClass)" :style="{ width: menuWidth }">
      <ComboboxInput v-model="search" class="w-full" placeholder="Search recipient..." />

      <ComboboxEmpty> No recipient found. </ComboboxEmpty>

      <ComboboxGroup>
        <ComboboxItem
          v-for="recipient in filteredRecipients"
          :key="recipient.value"
          :value="recipient"
        >
          {{ recipient.label }}
          <ComboboxItemIndicator>
            <Check :class="cn('ml-auto h-4 w-4')" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { Check, ChevronsUpDown, Search } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxTrigger,
} from '@/components/ui/combobox'
import { orpcVueQuery } from '../../../services/orpcClient'
import { authClient } from '../../../services/authClient'
import { useQuery } from '@tanstack/vue-query'
import Button from '@/components/ui/button/Button.vue'

const props = defineProps<{ class?: string; menuClass?: string; triggerRef?: any }>()

const emit = defineEmits(['update:modelValue'])

const localTriggerRef = ref<HTMLElement | null>(null)
const triggerRefToUse = computed(() => props.triggerRef ?? localTriggerRef)
const menuWidth = ref('auto')

onMounted(() => {
  if (triggerRefToUse.value?.value) menuWidth.value = `${triggerRefToUse.value.value.offsetWidth}px`
})
watch(triggerRefToUse, (el) => {
  if (el?.value) menuWidth.value = `${el.value.offsetWidth}px`
})

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

const recipients = computed(() => {
  if (!recipientsData.value?.recipients) return []
  return recipientsData.value.recipients.map((r) => ({
    label: r.recipient.recipientDisplayName,
    value: String(r.recipient.recipientId),
    ...r.recipient,
  }))
})

const search = ref('')
const filteredRecipients = computed(() => {
  if (!search.value) return recipients.value.slice(0, 8)
  return recipients.value
    .filter((r) => r.label.toLowerCase().includes(search.value.toLowerCase()))
    .slice(0, 8)
})

const value = ref<(typeof recipients.value)[0] | null>(null)
</script>
