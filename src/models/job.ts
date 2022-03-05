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
    jobId: number;
    applicantId?: string;
    createdOn?: Date;
    jobSchedules: number[];
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
}