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
    }

    updateUserById = async (userId: string, userProfile: UserProfile) => {
        this.loading = true;
        try {
            // Update user profile
            const updatedProfile = await agent.Profile.updateProfileById(userId, userProfile);
            runInAction(() => {
                this.userProfile = updatedProfile;
                this.userProfile.photos = updatedProfile.photos;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error: any) {
            console.error(error.response);
            runInAction(() => this.loading = false);
        }
    }
}