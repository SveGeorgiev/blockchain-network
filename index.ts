import "reflect-metadata"
import { plainToClass } from "class-transformer";

import { dataSource } from './src/data-source';
import { Blockchain } from "./src/blockchain";
import { Block } from './src/block';
import { Block as BlockEntity } from './src/entities/Block';


const initializeBlockchain = async () => {
    const blockEntities = await dataSource.manager.find(BlockEntity);
    const blocks = blockEntities.map(entity => plainToClass(Block, entity));
    return new Blockchain(blocks);
};

const addBlocks = async (blockchain: Blockchain, count: number): Promise<void> => {
    [...Array(count)].fill(0).forEach(async () => {
        await blockchain.addBlock({
            from: 'Svetkata',
            to: 'LimeAcademy',
            message: 'I want to be part of LimeAcademy'
        });
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

        // await addBlocks(blockchain, 2);

        console.log("blockchain:", blockchain.chain);
    };
};

environmentSetup();