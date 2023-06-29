import express, { Request, Response } from 'express';
import { dataSource } from '../src/data-source';
import { Block } from './entities/Block';

const app = express();
const port = 3000;

/**
 * Retrieves all blocks from the data source.
 * Endpoint: GET /blocks/all
 */
app.get('/blocks/all', async (req: Request, res: Response) => {
    try {
        const blocks = await dataSource.manager.find(Block);
        res.json(blocks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * Retrieves a block by its hash from the data source.
 * Endpoint: GET /block/hash/:hash
 * @param hash The hash of the block to retrieve.
 */
app.get('/block/hash/:hash', async (req: Request, res: Response) => {
    try {
        const block = await dataSource.manager.findOneBy(Block, { hash: req.params.hash });
        block ? res.json(block) : res.status(404).json({ error: 'Block not found' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * Starts the server and initializes the data source.
 */
const startServer = async () => {
    try {
        await dataSource.initialize();
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    } catch (error) {
        console.error(error);
    }
}

startServer();