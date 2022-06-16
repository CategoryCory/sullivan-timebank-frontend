export interface Photo {
    photoId: number;
    name: string;
    displayName: string;
    url: string;
    isCurrent: boolean;
    uploadedOn: Date;
    userId: string;
}