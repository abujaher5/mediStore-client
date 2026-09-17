import { authClient } from "@/lib/auth-client";
import { useInitialUser, type SessionUser } from "@/providers/UserProvider";

export const useCurrentUser = () => {
  const { data: session, isPending } = authClient.useSession();
  const initialUser = useInitialUser();
  const sessionUser = session?.user as SessionUser | undefined;

  return {
    user: isPending ? (initialUser ?? sessionUser) : sessionUser,
    isPending,
  };
};
