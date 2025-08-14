import React, { createContext, useState } from "react";
import { UserProvider } from './context/userContext';

type AppContextType = {
  nomeHotel: string;
  setNomeHotel: (nome: string) => void;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

export default function Provider({ children }: { children: React.ReactNode }) {
  const [nomeHotel, setNomeHotel] = useState("Hotel Shereton");

  return (
    <AppContext.Provider value={{ nomeHotel, setNomeHotel }}>
      <UserProvider>
        {children}
      </UserProvider>
    </AppContext.Provider>
  );
}
