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
export const orpcVueQuery = createORPCVueQueryUtils(orpcClient)
