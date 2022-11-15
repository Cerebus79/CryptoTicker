import { createContext, useContext, useSyncExternalStore } from "react"
import CommonStore from "./commonStore";
import CryptStore from "./cryptStore"
import UserStore from "./userStore";

interface Store
{
    cryptStore: CryptStore,
    commonStore: CommonStore,
    userStore: UserStore
}

export const store: Store = {
    cryptStore: new CryptStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore()
{
    return useContext(StoreContext);
}