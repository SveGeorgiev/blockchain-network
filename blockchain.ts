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

  public isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.getHash() !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.getPreviousHash() !== previousBlock.getHash()) {
        return false;
      }
    }

    return true;
  }
}

