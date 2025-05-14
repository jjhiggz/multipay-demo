import { useQuery } from '@tanstack/vue-query'
import { orpcVueQuery } from '@/services/orpcClient'
import { authClient } from '@/services/authClient'
import { computed } from 'vue'

export function useProfile() {
  const email = computed(() => authClient.useSession().value.data?.user.email)
  const options = computed(() =>
    orpcVueQuery.xeProfile.queryOptions({ input: { email: email.value! }, enabled: !!email.value }),
  )
  return useQuery(options)
}
