import * as crypto from "crypto";
import { dataSource } from '../data-source';
import { Block as BlockEntity } from '../entities/Block';
import { Transaction as TransactionEntity } from '../entities/Transaction';
import { Transaction } from "./transaction";

export class Block {
  public previousHash: string | null;
  public data: Transaction;
  public nonce: number;
  public timestamp: number;
  public hash: string;


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

  public calculateHash(): string {
    const dataString = `${this.previousHash}${JSON.stringify(this.data)}${this.timestamp}`;
    const hash = crypto.createHash('sha256');
    hash.update(dataString);
    return hash.digest('hex');
  }

  public getPreviousHash(): string | null {
    return this.previousHash;
  }

  public getHash(): string {
    return this.hash;
  }

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
