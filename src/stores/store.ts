import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";
import UserProfileStore from "./userProfileStore";
import UserRatingStore from "./userRatingStore";
import TokenTransactionsStore from "./tokenTransactionsStore";

interface Store {
    commonStore: CommonStore;
    modalStore: ModalStore;
    userStore: UserStore;
    userProfileStore: UserProfileStore;
    userRatingStore: UserRatingStore;
    tokenTransactionsStore: TokenTransactionsStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
    userStore: new UserStore(),
    userProfileStore: new UserProfileStore(),
    userRatingStore: new UserRatingStore(),
    tokenTransactionsStore: new TokenTransactionsStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}