export interface TokenBalance {
    userId: string;
    currentBalance: number;
}

export interface ITokenTransaction {
    senderId: string;
    recipientId: string;
    amount: number;
}