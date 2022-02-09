import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { UserAverageRating } from "../models/userRating";

export default class UserRatingStore {
    averageRating: UserAverageRating | undefined = undefined;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    getAverageRating = async (userId: string) => {
        this.setLoading(true);
        try {
            const averageRating = await agent.Ratings.getAverageRating(userId);
            runInAction(() => this.averageRating = averageRating);
            this.setLoading(false);
            return averageRating;
        } catch (error) {
            console.error(error);
            this.setLoading(false);
        }
    }
}