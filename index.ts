import "reflect-metadata"
import { dataSource } from './src/data-source';
import { Blockchain } from "./src/blockchain";

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
    await dataSource.initialize();

    if (dataSource.isInitialized) {
        const blockchain = new Blockchain();

        await buildBlocks(blockchain, 5);

        console.log("Blockchain:", blockchain.chain);
    };
};

environmentSetup();