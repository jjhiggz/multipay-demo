import { useQuery } from '@tanstack/vue-query'
import { authClient } from '../services/authClient'

// Define a query key for caching and invalidation
export const AUTH_SESSION_QUERY_KEY = ['auth', 'session']

/**
 * Fetches the current authentication session using the authClient.
 * It returns the session data which might include the user object.
 * Handles potential errors during the fetch.
 */
const fetchAuthSession = async () => {
  try {
    // Based on the previous successful usage in router guard
    const sessionResponse = await authClient.getSession()

    authClient.organization.getFullOrganization()
    // Assuming the response structure is { data: { user: ..., session: ... } } or similar
    // Return the data part which contains user/session info
    return sessionResponse.data
  } catch (error) {
    // If getSession throws (e.g., 401 Unauthorized), it means no active session.
    // We can return null or let useQuery handle the error.
    // Returning null might be cleaner for conditional rendering.
    console.error('Failed to fetch auth session:', error)
    return null // Indicate no active session
  }
}

/**
 * Composable hook to get the current authentication session data.
 * Uses Vue Query for fetching, caching, and background updates.
 */
export function useAuthSession() {
  return useQuery({
    queryKey: AUTH_SESSION_QUERY_KEY,
    queryFn: fetchAuthSession,
    // Optional: Configure staleTime, gcTime, refetch intervals etc.
    // staleTime: 5 * 60 * 1000, // 5 minutes
    // gcTime: 15 * 60 * 1000, // 15 minutes
    // refetchOnWindowFocus: true,
  })
}
