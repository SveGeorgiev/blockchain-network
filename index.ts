// Import required dependencies and modules
import "reflect-metadata";
import { plainToClass } from "class-transformer";

import { dataSource } from './src/data-source';
import { Blockchain } from "./src/models/blockchain";
import { Block } from './src/models/block';
import { Block as BlockEntity } from './src/entities/Block';
import { Transaction } from './src/models/transaction';

/**
 * Maps an array of block entities to an array of blocks.
 * @param blockEntities An array of block entities to be mapped.
 * @returns An array of mapped blocks.
 */
const mapBlockEntitiesToBlocks = (blockEntities: BlockEntity[]) => {
    return blockEntities.map((entity: BlockEntity) => {
        // Convert the entity to a Block instance using class-transformer's plainToClass
        const block: Block = plainToClass(Block, entity);

        // Extract transaction details from the block entity
        const [{ from, to, message }] = block?.transactions || [];

        // Create a new Block instance using the extracted data
        return new Block(
            block.previousHash,
            new Transaction(from, to, message),
            block.nonce,
            block.timestamp,
            block.hash
        );
    });
};

/**
 * Initializes a blockchain by retrieving block entities from a data source and mapping them to blocks.
 * @returns A promise that resolves to a new instance of the Blockchain class.
 */
const initializeBlockchain = async () => {
    // Retrieve block entities from the data source
    const blockEntities: BlockEntity[] = await dataSource.manager.find(BlockEntity);

    // Map block entities to blocks
    const blocks = mapBlockEntitiesToBlocks(blockEntities);

    // Return a new Blockchain instance initialized with the blocks
    return new Blockchain(blocks);
};

/**
 * Adds multiple blocks to a blockchain.
 * @param blockchain The blockchain to add blocks to.
 * @param count The number of blocks to add.
 * @returns A promise that resolves when all the blocks are added.
 */
const addBlocks = async (blockchain: Blockchain, count: number): Promise<void> => {
    [...Array(count)].fill(0).forEach(async () => {
        // Create a new transaction
        const transaction: Transaction = new Transaction('Svetkata', 'LimeAcademy', 'I want to be part of LimeAcademy');

        // Add the new block with the transaction to the blockchain
        await blockchain.addBlock(transaction);
    })
};

/**
 * Sets up the environment by initializing the data source, blockchain, and adding blocks.
 */
const environmentSetup = async () => {
    try {
        // Initialize the data source
        await dataSource.initialize();
    } catch (error) {
        console.error("Error during Data Source initialization", error);
    }

    if (dataSource.isInitialized) {
        // If the data source is initialized, proceed with further setup
        const blockchain = await initializeBlockchain(); // Initialize the blockchain
        const blockCount = 3;
        await addBlocks(blockchain, blockCount); // Add blocks to the blockchain

        console.log("blockchain:", blockchain.chain); // Output the blockchain's chain
    };
};

// Call the environment setup function to start the process
environmentSetup();