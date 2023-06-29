import { Block } from "./block.interface";
import { Transaction } from "./transaction.interface";

export interface Blockchain {
    chain: Block[];

    createGenesisBlock(): Promise<void>;
    addBlock(data: Transaction): Promise<void>;
    getPreviousBlock(): Block;
    validateBlock(previousBlock: Block, newBlock: Block): boolean;
    validateChain(): boolean;
}