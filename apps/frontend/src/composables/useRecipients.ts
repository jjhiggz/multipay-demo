import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { orpcVueQuery } from '@/services/orpcClient'

export function useRecipients(organizationId: string) {
  const options = computed(() =>
    orpcVueQuery.recipients.queryOptions({
      input: { organizationId },
    }),
  )
  const { data, isPending, error } = useQuery(options)
  const recipients = computed(() => data.value?.recipients ?? [])
  return { recipients, isPending, error }
}
