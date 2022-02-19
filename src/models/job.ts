export interface Job {
    displayId: string;
    jobName: string;
    description: string;
    expiresOn: Date;
    jobStatus: string;
    createdOn: Date;
    jobCategoryId: number;
    jobCategory: string;
    createdById?: string;
    createdBy?: string;
}

export interface JobCategory {
    jobCategoryId: number;
    jobCategoryName: string;
    jobCategorySlug: string;
}