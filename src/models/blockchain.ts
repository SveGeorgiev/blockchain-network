import { isEmpty } from 'lodash';

import { Block } from "./block";
import { Transaction } from './transaction';

export class Blockchain {
  public chain: Block[];

  constructor(chain: Block[]) {
    this.chain = chain;
    isEmpty(this.chain) && this.createGenesisBlock();
  }

  private async createGenesisBlock(): Promise<void> {
    const transaction: Transaction = new Transaction(null, null, 'Genesis Block');
    const genesisBlock = new Block(null, transaction);
    this.chain.push(genesisBlock);
    await genesisBlock.saveToDatabase();
  }

  public async addBlock(data: Transaction): Promise<void> {
    const previousBlock = this.getPreviousBlock();
    const block = new Block(previousBlock?.getHash(), data, this.chain.length);
    const isValidBlock = this.validateBlock(previousBlock, block);
    const isValidChain = this.validateChain();

    if (isValidBlock && isValidChain) {
      this.chain.push(block);
      await block.saveToDatabase();
    } else {
      console.log('Chain validation failed: Invalid block detected.');
    }
  }

  private getPreviousBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  private validateBlock(previousBlock: Block, newBlock: Block): boolean {
    return newBlock.getHash() === newBlock.calculateHash()
      && newBlock.getPreviousHash() === previousBlock?.getHash();
  }

  private validateChain(): boolean {
    let previousBlock: Block | null = null;

    for (const currentBlock of this.chain) {
      if (previousBlock && !this.validateBlock(previousBlock, currentBlock)) {
        return false;
      }

      previousBlock = currentBlock;
    }

    return true;
  }
}

