import { env } from "@/env";
import { createAuthClient } from "better-auth/react";

const NEXT_PUBLIC_API_URL = env.NEXT_PUBLIC_API_URL;
export const authClient = createAuthClient({
  baseURL: `${NEXT_PUBLIC_API_URL}`,
  fetchOptions: {
    credentials: "include",
  },
});
