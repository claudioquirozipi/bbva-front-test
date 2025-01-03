import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { type Client, clients as dataClients } from "@/app/client/data/client";

const ClientContext = createContext<{
  clients: Client[];
  setClients: Dispatch<SetStateAction<Client[]>>;
}>({ clients: [], setClients: () => {} });

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<Client[]>(dataClients);

  return (
    <ClientContext.Provider value={{ clients, setClients }}>
      {children}
    </ClientContext.Provider>
  );
};

const useClientContext = () => {
  return useContext(ClientContext);
};

export default useClientContext;
