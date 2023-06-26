import { Block } from "./block";

export class Blockchain {
  public chain: Block[];

  constructor() {
    this.chain = [];
    this.createGenesisBlock();
  }

  private createGenesisBlock(): void {
    const genesisBlock = new Block(null, 'Genesis Block', this.chain.length);
    this.chain.push(genesisBlock);
  }

  public addBlock(data: any): void {
    const previousBlock = this.chain[this.chain.length - 1];
    const block = new Block(previousBlock.getHash(), data, this.chain.length);
    this.chain.push(block);
  }
}

