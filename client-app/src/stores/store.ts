import { createContext, useContext } from "react"
import CryptStore from "./cryptStore"

interface Store
{
    cryptStore: CryptStore
}

export const store: Store = {
    cryptStore: new CryptStore()
}

export const StoreContext = createContext(store);

export function useStore()
{
    return useContext(StoreContext);
}