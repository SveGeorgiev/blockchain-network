import "reflect-metadata"
import { dataSource } from './src/data-source';
import { Blockchain } from "./src/blockchain";
import { Block } from './src/entities/Block';
import { Transaction } from './src/entities/Transaction';

const buildBlocks = async (blockchain: Blockchain, count: number): Promise<void> => {
    const numbers = Array.from(Array(count).keys());

    for (const num of numbers) {
        await blockchain.addBlock({
            transaction: `Transaction ${num}`,
            from: 'Svetkata',
            to: 'LimeAcademy',
            message: 'I want to be part of LimeAcademy'
        });
    }
}

const environmentSetup = async () => {
    try {
        await dataSource.initialize();
    } catch (error) {
        console.error("Error during Data Source initialization", error);
    }

    if (dataSource.isInitialized) {
        const blockchain = new Blockchain();

        await buildBlocks(blockchain, 5);

        // const blocks = await dataSource.manager.find(Block);
        // console.log("blocks:", blocks);
        // const transactions = await dataSource.manager.find(Transaction);
        // console.log("transactions:", transactions);

        console.log("blockchain:", blockchain.chain);
    };
};

environmentSetup();