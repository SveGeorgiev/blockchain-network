import "reflect-metadata";
import { plainToClass } from "class-transformer";

import { dataSource } from './src/data-source';
import { Blockchain } from "./src/models/blockchain";
import { Block } from './src/models/block';
import { Block as BlockEntity } from './src/entities/Block';
import { Transaction } from './src/models/transaction';

const initializeBlockchain = async () => {
    const blockEntities: BlockEntity[] = await dataSource.manager.find(BlockEntity);
    const blocks = blockEntities.map((entity: BlockEntity) => {
        const block: Block = plainToClass(Block, entity);
        const [{ from, to, message }] = block?.transactions || [];
        return new Block(
            block.previousHash,
            new Transaction(from, to, message),
            block.nonce,
            block.timestamp,
            block.hash
        );
    });
    return new Blockchain(blocks);
};

const addBlocks = async (blockchain: Blockchain, count: number): Promise<void> => {
    [...Array(count)].fill(0).forEach(async () => {
        const transaction: Transaction = new Transaction('Svetkata', 'LimeAcademy', 'I want to be part of LimeAcademy');
        await blockchain.addBlock(transaction);
    })
}

const environmentSetup = async () => {
    try {
        await dataSource.initialize();
    } catch (error) {
        console.error("Error during Data Source initialization", error);
    }

    if (dataSource.isInitialized) {
        const blockchain = await initializeBlockchain();

        await addBlocks(blockchain, 3);

        console.log("blockchain:", blockchain.chain);
    };
};

environmentSetup();