import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Job } from "../models/job";

export default class JobStore {
    jobRegistry = new Map<string, Job>();
    selectedJob: Job | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadJobs = async () => {
        this.setLoadingInitial(true);
        try {
            const jobs = await agent.Jobs.getAllJobs();
            jobs.forEach(job => {
                this.setJob(job);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.error(error);
            this.setLoadingInitial(false);
        }
    }

    loadJob = async (id: string) => {
        let job = this.getJob(id);
        if (job) {
            this.selectedJob = job;
            return job;
        } else {
            this.setLoadingInitial(true);
            try {
                job = await agent.Jobs.getJobById(id);
                this.setJob(job);
                runInAction(() => {
                    this.selectedJob = job;
                });
                this.setLoadingInitial(false);
                return job;
            } catch (error) {
                console.error(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setJob = (job: Job) => {
        this.jobRegistry.set(job.displayId, job);
    }

    private getJob = (id: string) => {
        return this.jobRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
}