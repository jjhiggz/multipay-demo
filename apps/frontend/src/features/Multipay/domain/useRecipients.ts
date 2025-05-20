import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { orpcVueQuery } from '@/services/orpcClient'
import { authClient } from '@/services/authClient'

export function useRecipients() {
  const activeOrg = authClient.useActiveOrganization()
  const organizationId = computed(() => activeOrg.value?.data?.id ?? '')
  const options = computed(() =>
    orpcVueQuery.recipients.queryOptions({
      input: { organizationId: organizationId.value },
    }),
  )
  const { data, isPending, error } = useQuery(options)
  const recipients = computed(() => data.value?.recipients ?? [])
  return { recipients, isPending, error }
}
