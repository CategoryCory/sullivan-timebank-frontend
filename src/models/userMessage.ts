export interface IMessageThread {
    messageThreadId?: number;
    createdOn?: Date;
    jobId: number;
    toUserId: string;
    fromUserId: string;
}

export interface IMessageThreadCheck {
    jobId: number;
    jobCreatorId?: string;
    jobApplicantId: string;
}

export interface IMessage {
    messageId?: number;
    isFromSender: boolean;
    createdOn?: Date;
    isRead?: boolean;
    readOn?: Date;
    body: string;
    authorId: string;
    recipientId?: string;
    messageThreadId: number;
    jobId?: number;
}