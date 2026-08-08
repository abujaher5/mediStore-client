import { cookies } from "next/headers";

export async function serverApiFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const cookieStore = await cookies();

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Something went wrong");
  }

  return result.data;
}
