import crypto from 'crypto';

export class Block {
  private timestamp: number;
  private data: any;
  private previousHash: string | null;
  private hash: string;

  constructor(previousHash: string | null, data: any) {
    this.timestamp = Date.now();
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  public calculateHash(): string {
    const dataString = `${this.previousHash}${this.timestamp}${JSON.stringify(this.data)}`;
    const hash = crypto.createHash('sha256');
    hash.update(dataString);
    return hash.digest('hex');
  }

  getPreviousHash(): string | null {
    return this.previousHash;
  }

  getHash(): string {
    return this.hash;
  }
}
