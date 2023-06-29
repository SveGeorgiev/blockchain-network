import { Transaction } from "../intefaces/transaction.interface";

export interface Block {
    previousHash: string | null;
    data: Transaction;
    nonce: number;
    timestamp: number;
    hash: string;
    transactions?: Transaction[];

    calculateHash(): string;
    getPreviousHash(): string | null;
    getHash(): string;
    saveToDatabase(): Promise<void>;
}