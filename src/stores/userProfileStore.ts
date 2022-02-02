import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { UserProfile } from "../models/user";

export default class UserProfileStore {
    userProfile: UserProfile | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    getByEmail = async (email: string) => {
        // if (this.userProfile != null) {
        //     return this.userProfile;
        // } else {
            this.setLoadingInitial(true);
            try {
                const userProfile = await agent.Profile.getProfileByEmail(email);
                runInAction(() => this.userProfile = userProfile);
                this.setLoadingInitial(false);
                return userProfile;
            } catch (error) {
                console.error(error);
                this.setLoadingInitial(false);
            }
        // }
    }

    updateByEmail = async (email: string, userProfile: UserProfile) => {
        this.loading = true;
        try {
            await agent.Profile.updateProfileByEmail(email, userProfile);
            runInAction(() => {
                this.userProfile = userProfile;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.error(error);
            runInAction(() => this.loading = false);
        }
    }
}