import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";
import UserProfileStore from "./userProfileStore";

interface Store {
    commonStore: CommonStore;
    modalStore: ModalStore;
    userStore: UserStore;
    userProfileStore: UserProfileStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
    userStore: new UserStore(),
    userProfileStore: new UserProfileStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}