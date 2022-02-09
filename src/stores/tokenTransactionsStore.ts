import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { TokenBalance } from "../models/tokenTransactions";

export default class TokenTransactionsStore {
    tokenBalance: TokenBalance | undefined = undefined;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    getTokenBalance = async (userId: string) => {
        this.setLoading(true);
        try {
            const tokenBalance = await agent.TokenTransactions.getTotalTokens(userId);
            runInAction(() => this.tokenBalance = tokenBalance);
            this.setLoading(false);
            return tokenBalance;
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }
}