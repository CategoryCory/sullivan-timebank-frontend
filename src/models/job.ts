import { UserProfile } from "./user";

export interface IJob {
    jobId?: number;
    displayId: string;
    jobName: string;
    description: string;
    jobScheduleType: string;
    expiresOn: Date;
    jobStatus?: string;
    createdOn?: Date;
    jobCategoryId?: number;
    jobCategory?: string;
    createdById?: string;
    createdBy?: string;
    jobSchedules?: IJobCustomSchedule[];
    jobApplications?: IJobApplication[];
}

export interface IJobForm {
    displayId: string;
    jobName: string;
    description: string;
    jobScheduleType: string;
    expiresOn: Date;
    jobStatus?: string;
    jobCategoryId?: number;
    jobSchedules?: IJobCustomSchedule[];
}

export interface IJobApplication {
    jobApplicationId?: number;
    status?: string;
    createdOn?: Date;
    resolvedOn?: Date;
    jobId: number;
    jobName?: string;
    jobCreatedByName?: string;
    jobCategory?: string;
    applicant?: UserProfile;
    jobApplicationScheduleId?: number;
    jobApplicationSchedule?: IJobCustomSchedule;
    // jobSchedules?: number[];
    // jobApplicationSchedules?: IJobCustomSchedule[];
}

export interface IJobCategory {
    jobCategoryId: number;
    jobCategoryName: string;
    jobCategorySlug?: string;
}

export interface IJobCustomSchedule {
    jobScheduleId?: number;
    dayOfWeek: string;
    timeBegin: number | undefined;
    timeEnd: number | undefined;
    jobScheduleStatus?: string;
}