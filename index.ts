import { Blockchain } from "./blockchain";

const blockchain = new Blockchain();

blockchain.addBlock({ transaction: "Transaction 1", from: 'Svetkata', to: 'LimeAcademy', message: 'I want to be part of LimeAcademy' });
blockchain.addBlock({ transaction: "Transaction 2", from: 'Svetkata', to: 'LimeAcademy', message: 'I want to be part of LimeAcademy' });

console.log("Blockchain:", blockchain.chain);
