export interface UserRating {
    userRatingId?: number;
    rating: number;
    comments?: string;
    createdOn?: Date;
    authorId: string;
    authorName?: string;
    revieweeId: string;
    revieweeName?: string;
}

export interface UserAverageRating {
    userId: string;
    averageRating: number;
}