import * as crypto from "crypto";
import { Block as BlockEntity } from './entities/Block';
import { Transaction as TransactionEntity } from './entities/Transaction';
import { dataSource } from './data-source';

export class Block {
  private timestamp: number;
  private data: any;
  private previousHash: string | null;
  private hash: string;
  private nonce: number;

  constructor(previousHash: string | null, data: any, nonce: number) {
    this.timestamp = Date.now();
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = nonce;
  }

  public calculateHash(): string {
    const dataString = `${this.previousHash}${this.timestamp}${JSON.stringify(this.data)}`;
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
    blockEntity.previousHash = this.previousHash;
    await dataSource.manager.save(blockEntity);

    const transactionEntity = new TransactionEntity();
    transactionEntity.data = JSON.stringify(this.data);
    transactionEntity.block = blockEntity;
    await dataSource.manager.save(transactionEntity);
  }
}