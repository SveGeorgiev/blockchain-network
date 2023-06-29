# Blockchain Network

- This program demonstrates the usage of the provided classes and modules to initialize a blockchain, retrieve data from a data source, add blocks to the blockchain, and output the blockchain's chain. It serves as a starting point for building a more comprehensive blockchain application using TypeScript.

- The `Block` class represents a block in a blockchain. It has properties such as previousHash, data, nonce, timestamp, and hash to store relevant information about the block. It also includes methods for calculating the hash of the block, retrieving the previous hash, and saving the block and its associated transaction to a database.

- The `Blockchain` class represents a blockchain, which is a collection of blocks. It provides functionality to add blocks to the blockchain, validate the integrity of the blocks and the entire blockchain, and create the genesis block.

## Setup

- Set Database Connection Settings: Open the `data-source.ts` file and configure the necessary settings for connecting to the database. Ensure you provide the correct host, port, username, password, and database name.

- Create the Database: Ensure that the specified database exists. If it doesn't, create it manually or use a database management tool to create the database based on the configured settings.

- Install Modules: Open your terminal or command prompt and navigate to the project directory. Run the command `npm install` to install all the required modules and dependencies for the project. This step ensures that the project has all the necessary libraries to run successfully.

## Start

- Start the Blockchain: Once the modules are installed, you can start the blockchain by running the command `ts-node index.ts` in your terminal or command prompt. This command will execute the index.ts file using the ts-node package, which allows running TypeScript files directly without explicit compilation.

- Start the API: Open a new terminal and enter the command `ts-node .\src\server.ts`. This command will initiate the execution of the API by running the server.ts file using ts-node.
