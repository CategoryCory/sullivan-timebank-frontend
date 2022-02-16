import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
// import { Skill } from "../models/skill";
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

    getUserById = async (userId: string) => {
        // if (this.userProfile != null) {
        //     return this.userProfile;
        // } else {
            this.setLoadingInitial(true);
            try {
                const userProfile = await agent.Profile.getProfileById(userId);
                runInAction(() => this.userProfile = userProfile);
                this.setLoadingInitial(false);
                return userProfile;
            } catch (error) {
                console.error(error);
                this.setLoadingInitial(false);
            }
        // }
    }

    updateUserById = async (userId: string, userProfile: UserProfile) => {
        this.loading = true;
        try {
            // Update user profile
            await agent.Profile.updateProfileById(userId, userProfile);
            runInAction(() => {
                this.userProfile = userProfile;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error: any) {
            console.error(error.response);
            runInAction(() => this.loading = false);
        }
    }
}