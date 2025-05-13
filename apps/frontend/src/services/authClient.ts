import { createAuthClient } from 'better-auth/client'
import { organizationClient } from 'better-auth/client/plugins' // Import the client plugin

export const authClient = createAuthClient({
  authUrl: 'http://localhost:3000',
  baseURL: 'http://localhost:3000',
  plugins: [
    organizationClient(), // Add the organization client plugin
  ],
})
