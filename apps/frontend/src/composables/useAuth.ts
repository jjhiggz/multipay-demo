import { useQuery } from '@tanstack/vue-query'
import { orpcVueQuery } from '../services/orpcClient'
import { computed } from 'vue'

const GET_CURRENT_USER_QUERY_KEY = ['auth', 'getCurrentUser']

export function useCurrentUser() {
  const queryOptions = {
    ...orpcVueQuery.getCurrentUser,
    queryKey: GET_CURRENT_USER_QUERY_KEY,
  }

  const { data: user, isLoading, isFetching, isError, error, refetch } = useQuery(queryOptions)

  const isAuthenticated = computed(() => !!user.value)

  return {
    user,
    isLoading: computed(() => isLoading.value || isFetching.value),
    isAuthenticated,
    isError,
    error,
    refetchCurrentUser: refetch, // Expose refetch if needed
  }
}

export { GET_CURRENT_USER_QUERY_KEY }
