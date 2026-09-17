"use client";

import * as React from "react";

export type SessionUser = {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  role?: string;
};

const UserContext = React.createContext<SessionUser | null>(null);

function UserProvider({
  initialUser,
  children,
}: {
  initialUser: SessionUser | null;
  children: React.ReactNode;
}) {
  return (
    <UserContext.Provider value={initialUser}>{children}</UserContext.Provider>
  );
}

function useInitialUser() {
  return React.useContext(UserContext);
}

export { UserProvider, useInitialUser };
