import { createORPCClient } from '@orpc/client' // Import directly
import { RPCLink } from '@orpc/client/fetch' // Correct import for RPCLink
import type { AppRouter } from '../../../server/src/routers/index'
import type { RouterClient } from '@orpc/server' // For explicitly typing the client if needed
import { createORPCVueQueryUtils } from '@orpc/vue-query'

const backendUrl = 'http://localhost:3000'

// Create an RPCLink instance
const rpcLink = new RPCLink({
  url: `${backendUrl}/rpc`,
  fetch: (url: string | URL | Request, options?: RequestInit): Promise<Response> => {
    return fetch(url, {
      ...options,
      credentials: 'include',
    })
  },
})

// Create the typed oRPC client
// The createORPCClient is generic over the AppRouter type from your backend
// We'll try wrapping AppRouter with RouterClient from @orpc/server
export const orpcClient = createORPCClient<RouterClient<AppRouter>>(rpcLink)

// ---- NEW CODE FOR TANSTACK QUERY INTEGRATION ----
/**
 * oRPC Vue Query Utilities.
 * This wraps the base orpcClient and provides methods to generate
 * queryOptions, mutationOptions, etc., for use with @tanstack/vue-query.
 *
 * Example Usage (in a .vue component or Pinia store):
 * import { useQuery } from '@tanstack/vue-query';
 * import { orpcVueQuery } from './orpcClient'; // Adjust path as needed
 *
 * const { data, isLoading, error } = useQuery(
 *   orpcVueQuery.auth.getCurrentUser.queryOptions()
 * );
 *
 * // For procedures with input:
 * // orpcVueQuery.todos.getById.queryOptions({ input: { id: '123' } })
 */
export const orpcVueQuery = createORPCVueQueryUtils(orpcClient)
// ---- END NEW CODE ----

// Example of how to potentially get AppRouter type if direct import is problematic:
// Option 1: If you have a shared types package (ideal)
// import type { AppRouter } from '@my-monorepo/shared-types';

// Option 2: Generate types from openapi.json separately (e.g. using openapi-typescript)
// and then use those types. For now, the direct import is attempted.
