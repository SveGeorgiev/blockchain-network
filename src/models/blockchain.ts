import { isEmpty } from 'lodash';

import { Block } from "./block";
import { Transaction } from './transaction';
import { Blockchain as IBlockchain } from '../intefaces/blockchain.interface';

/**
 * Represents a blockchain, which is a collection of blocks.
 */
export class Blockchain implements IBlockchain {
  public chain: Block[];

  /**
 * Creates a new instance of the Blockchain class.
 * @param chain The array of blocks to initialize the blockchain with.
 */
  constructor(chain: Block[]) {
    this.chain = chain;
    isEmpty(this.chain) && this.createGenesisBlock();
  }

  /**
 * Adds a new block to the blockchain.
 * @param data The transaction data to be stored in the new block.
 * @returns A promise that resolves when the block is successfully added.
 */
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

  /**
 * Creates the genesis block, which is the first block in the blockchain.
 * @returns A promise that resolves when the genesis block is created.
 */
  private async createGenesisBlock(): Promise<void> {
    const transaction: Transaction = new Transaction('', '', 'Genesis Block');
    const genesisBlock = new Block(null, transaction);
    this.chain.push(genesisBlock);
    await genesisBlock.saveToDatabase();
  }

  /**
 * Retrieves the previous block in the blockchain.
 * @returns The previous block in the blockchain.
 */
  private getPreviousBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  /**
 * Validates a block by comparing its hash and previous hash with the previous block.
 * @param previousBlock The previous block in the blockchain.
 * @param newBlock The block to be validated.
 * @returns A boolean indicating whether the block is valid or not.
 */
  private validateBlock(previousBlock: Block, newBlock: Block): boolean {
    return newBlock.getHash() === newBlock.calculateHash()
      && newBlock.getPreviousHash() === previousBlock?.getHash();
  }

  /**
 * Validates the entire blockchain by verifying the integrity of each block.
 * @returns A boolean indicating whether the blockchain is valid or not.
 */
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

