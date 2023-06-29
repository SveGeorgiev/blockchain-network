import { Transaction as ITransaction } from "../intefaces/transaction.interface";

/**
 * Represents a transaction in a blockchain.
 */
export class Transaction implements ITransaction {
    public from: string;
    public to: string;
    public message: string;

    /**
 * Creates a new Transaction instance.
 * @param from The sender of the transaction.
 * @param to The recipient of the transaction.
 * @param message The message or details of the transaction.
 */
    constructor(from: string, to: string, message: string) {
        this.from = from;
        this.to = to;
        this.message = message;
    }
}