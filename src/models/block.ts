import * as crypto from "crypto";
import { dataSource } from '../data-source';
import { Block as BlockEntity } from '../entities/Block';
import { Block as IBlock } from '../intefaces/block.interface';
import { Transaction as TransactionEntity } from '../entities/Transaction';
import { Transaction } from "./transaction";

/**
 * Represents a block in a blockchain.
 */
export class Block implements IBlock {
  public previousHash: string | null;
  public data: Transaction;
  public nonce: number;
  public timestamp: number;
  public hash: string;
  public transactions?: Transaction[] = [];

  /**
   * Creates a new instance of the Block class.
   * @param previousHash The hash of the previous block in the blockchain.
   * @param data The data stored in the block, typically a transaction.
   * @param nonce The nonce default value is 0.
   * @param timestamp The timestamp when the block was created. Default is the current timestamp.
   * @param hash The hash of the current block. Default is calculated based on the other properties.
   */
  constructor(
    previousHash: string | null,
    data: Transaction,
    nonce?: number,
    timestamp?: number,
    hash?: string
  ) {
    this.previousHash = previousHash;
    this.data = data;
    this.nonce = nonce || 0;
    this.timestamp = timestamp || Date.now();
    this.hash = hash || this.calculateHash();
  }

  /**
  * Calculates the hash of the block based on its properties.
  * @returns The calculated hash value.
  */
  public calculateHash(): string {
    const dataString = `${this.previousHash}${JSON.stringify(this.data)}${this.timestamp}`;
    const hash = crypto.createHash('sha256');
    hash.update(dataString);
    return hash.digest('hex');
  }

  /**
 * Retrieves the hash of the previous block.
 * @returns The hash of the previous block.
 */
  public getPreviousHash(): string | null {
    return this.previousHash;
  }

  /**
 * Retrieves the hash of the current block.
 * @returns The hash of the current block.
 */
  public getHash(): string {
    return this.hash;
  }

  /**
 * Saves the block and its associated transaction to the database.
 * @returns A promise that resolves when the saving process is complete.
 */
  async saveToDatabase(): Promise<void> {
    const blockEntity = new BlockEntity();
    blockEntity.timestamp = this.timestamp;
    blockEntity.hash = this.hash;
    blockEntity.previousHash = this.previousHash;
    blockEntity.nonce = this.nonce;
    await dataSource.manager.save(blockEntity);

    const transactionEntity = new TransactionEntity();
    transactionEntity.from = this.data?.from;
    transactionEntity.to = this.data?.to;
    transactionEntity.message = this.data?.message;
    transactionEntity.block = blockEntity;
    await dataSource.manager.save(transactionEntity);
  }
}
