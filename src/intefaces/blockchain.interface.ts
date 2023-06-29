import { Block } from "./block.interface";
import { Transaction } from "./transaction.interface";

export interface Blockchain {
    chain: Block[];

    addBlock(data: Transaction): Promise<void>;
}