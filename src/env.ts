import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    BACKEND_URL: z.url({ error: "Invalid BACKEND_URL" }),
    FRONTEND_URL: z.url({ error: "Invalid FRONTEND_URL" }),
    API_URL: z.url({ error: "Invalid API_URL" }),
    AUTH_URL: z.url({ error: "Invalid AUTH_URL" }),
  },

  client: {
    NEXT_PUBLIC_API_URL: z.url({ error: "Invalid NEXT_PUBLIC_API_URL" }),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    API_URL: process.env.API_URL,
    AUTH_URL: process.env.AUTH_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
