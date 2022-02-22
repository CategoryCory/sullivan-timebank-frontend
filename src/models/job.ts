export interface Job {
    displayId: string;
    jobName: string;
    description: string;
    jobScheduleType: string;
    expiresOn: Date;
    jobStatus?: string;
    createdOn?: Date;
    jobCategoryId: number;
    jobCategory?: string;
    createdById?: string;
    createdBy?: string;
    jobSchedules?: JobCustomSchedule[];
}

export interface JobCategory {
    jobCategoryId: number;
    jobCategoryName: string;
    jobCategorySlug: string;
}

export interface JobCustomSchedule {
    dayOfWeek: string;
    timeBegin: number | undefined;
    timeEnd: number | undefined;
}