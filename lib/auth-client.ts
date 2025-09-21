import { createAuthClient } from "better-auth/react"
import { getBaseURL } from "./get-base-url"
import { anonymousClient } from "better-auth/client/plugins"
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
    baseURL: getBaseURL(),
    plugins: [
      anonymousClient(),
      inferAdditionalFields<typeof auth>()
  ]
})