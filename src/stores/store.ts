import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";
import UserProfileStore from "./userProfileStore";
import UserRatingStore from "./userRatingStore";
import TokenTransactionsStore from "./tokenTransactionsStore";
import SkillStore from "./skillStore";

interface Store {
    commonStore: CommonStore;
    modalStore: ModalStore;
    userStore: UserStore;
    userProfileStore: UserProfileStore;
    userRatingStore: UserRatingStore;
    tokenTransactionsStore: TokenTransactionsStore;
    skillStore: SkillStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
    userStore: new UserStore(),
    userProfileStore: new UserProfileStore(),
    userRatingStore: new UserRatingStore(),
    tokenTransactionsStore: new TokenTransactionsStore(),
    skillStore: new SkillStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}