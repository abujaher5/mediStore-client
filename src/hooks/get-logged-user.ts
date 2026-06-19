import { authClient } from "@/lib/auth-client";

type UserType = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
};

export const useCurrentUser = () => {
  const { data: session, isPending } = authClient.useSession();

  return {
    user: session?.user as UserType | undefined,
    isPending,
  };
};
