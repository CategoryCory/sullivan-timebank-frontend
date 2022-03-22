export interface TokenBalance {
    userId: string;
    currentBalance: number;
}

export interface ITokenTransaction {
    tokenTransactionId?: number;
    senderId: string;
    senderName?: string;
    recipientId: string;
    recipientName?: string;
    amount: number;
    processedOn?: Date;
}