import { Block } from "./block";

export class Blockchain {
  public chain: Block[];

  constructor() {
    this.chain = [];
    this.createGenesisBlock();
  }

  private async createGenesisBlock(): Promise<void> {
    const genesisBlock = new Block(null, 'Genesis Block', this.chain.length);
    await genesisBlock.saveToDatabase();
    this.chain.push(genesisBlock);
  }

  public async addBlock(data: any): Promise<void> {
    const previousBlock = this.chain[this.chain.length - 1];
    const block = new Block(previousBlock?.getHash(), data, this.chain.length);
    this.chain.push(block);
    await block.saveToDatabase();
  }
}

