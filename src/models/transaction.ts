import { Transaction as ITransaction } from "../intefaces/transaction.interface";

export class Transaction implements ITransaction {
    public from: string;
    public to: string;
    public message: string;

    constructor(from: string, to: string, message: string) {
        this.from = from;
        this.to = to;
        this.message = message;
    }
}