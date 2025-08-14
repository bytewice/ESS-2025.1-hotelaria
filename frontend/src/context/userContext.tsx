import { createContext, useState, ReactNode } from "react";
import { UserComum } from "../types/userComum";

interface UserContextType {
  user: UserComum | null;
  setUser: (user: UserComum | null) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserComum | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};