import express, { Request, Response } from 'express';
import { dataSource } from '../src/data-source';
import { Block } from './entities/Block'

const app = express();
const port = 3000;

app.get('/blocks/all', async (req: Request, res: Response) => {
    try {
        const blocks = await dataSource.manager.find(Block);
        res.json(blocks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.get('/block/hash/:hash', async (req: Request, res: Response) => {
//     try {
//         const block = await dataSource.manager.findOneBy(Block, { hash: req.params.hash });
//         res.json(block);

//         if (!block) {
//             res.status(404).json({ error: 'Block not found' });
//         } else {
//             res.json(block);
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

const startServer = async () => {
    try {
        await dataSource.initialize();
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    } catch (error) {
        console.error(error);
    }
}

startServer();