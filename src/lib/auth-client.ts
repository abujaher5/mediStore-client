// import { env } from "@/env";
import { createAuthClient } from "better-auth/react";

// const NEXT_PUBLIC_API_URL = env.NEXT_PUBLIC_API_URL;
// const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  fetchOptions: {
    credentials: "include",
  },

  plugins: [
    {
      id: "next-cookies-request",
      fetchPlugins: [
        {
          id: "next-cookies-request-plugin",
          name: "next-cookies-request-plugin",
          hooks: {
            async onRequest(ctx) {
              if (typeof window === "undefined") {
                const { cookies } = await import("next/headers");
                const headers = await cookies();
                ctx.headers.set("cookie", headers.toString());
              }
            },
          },
        },
      ],
    },
  ],
});

export const signInWithGoogle = async () => {
  return await authClient.signIn.social({
    provider: "google",
    callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}`,
  });
};
