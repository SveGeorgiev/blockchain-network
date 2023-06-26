import { Blockchain } from "./blockchain";

const blockchain = new Blockchain();

const buildBlocks = (count: number) => {
    const numbers = Array.from(Array(count).keys());

    for (const num of numbers) {
        blockchain.addBlock({
            transaction: `Transaction ${num}`,
            from: 'Svetkata',
            to: 'LimeAcademy',
            message: 'I want to be part of LimeAcademy'
        });
    }
}

buildBlocks(7);

console.log("Blockchain:", blockchain.chain);
