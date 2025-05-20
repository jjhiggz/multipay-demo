import { computed } from 'vue'
import { orpcVueQuery } from '@/services/orpcClient'
import { authClient } from '@/services/authClient'
import { useMappedQuery } from '@/shared/lib/map-query'

export type FERecipient = {
  currencyCode: string
  recipientId: number
  recipientDisplayName: string
  bankCountryCode: string
  bankName: string
  accountNumber: string
}

export function useRecipients() {
  const activeOrg = authClient.useActiveOrganization()
  const organizationId = computed(() => activeOrg.value?.data?.id ?? '')
  const options = computed(() =>
    orpcVueQuery.recipients.queryOptions({
      input: { organizationId: organizationId.value },
    }),
  )
  return useMappedQuery(options, {
    mapData: (input): FERecipient[] => input.recipients.map((n) => n.recipient),
  })
}
