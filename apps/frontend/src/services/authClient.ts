import { createAuthClient } from 'better-auth/client'

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000', // Change to your deployed API base URL if needed
})
