export interface IJob {
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

export interface IJobCategory {
    jobCategoryId: number;
    jobCategoryName: string;
    jobCategorySlug?: string;
}

export interface IJobCustomSchedule {
    dayOfWeek: string;
    timeBegin: number | undefined;
    timeEnd: number | undefined;
}