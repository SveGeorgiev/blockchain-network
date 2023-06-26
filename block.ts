import crypto from 'crypto';

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
}
