import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { authClient } from '../services/authClient'
import { useAuthSession } from './useAuthSession'

// Define a query key for user organizations
export const USER_ORGANIZATIONS_QUERY_KEY = ['organizations', 'user']

/**
 * Fetches the organizations the current user is a member of.
 * Assumes authClient provides a method like listMemberships under the organization plugin namespace.
 */
const fetchUserOrganizations = async () => {
  try {
    // Try authClient.organization.list()
    const response = await authClient.organization.list()
    return response.data
  } catch (error) {
    console.error('Failed to fetch user organizations:', error)
    // Re-throw or return null/empty array depending on desired error handling
    throw error // Let useQuery handle the error state
  }
}

/**
 * Composable hook to get the organizations for the current user.
 * Depends on useAuthSession to get the user ID.
 * Query is enabled only when the user is authenticated.
 */
export function useUserOrganizations() {
  const { data: sessionData } = useAuthSession()

  // Compute the user ID from the session data
  const userId = computed(() => sessionData.value?.user?.id)

  return useQuery({
    // Query key includes the user ID, so it refetches if the user changes
    queryKey: [...USER_ORGANIZATIONS_QUERY_KEY, userId],
    queryFn: fetchUserOrganizations,
    // Enable the query only when the userId is available
    enabled: computed(() => !!userId.value),
    // Optional: Configure staleTime, gcTime etc.
    // staleTime: 5 * 60 * 1000,
  })
}
