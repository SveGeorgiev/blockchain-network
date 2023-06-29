import { Block } from "./block";

export class Transaction {
    public id?: number;
    public from: string;
    public to: string;
    public message: string;
    public block?: Block;

    constructor(from: string, to: string, message: string) {
        this.from = from;
        this.to = to;
        this.message = message;
    }
}