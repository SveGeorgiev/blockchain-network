# Blockchain Network

# 1. **Create your own blockchain network and generate blocks:**

## Your Task:

- You need to create a **class** that handles the creation of a **`Block`**. The block will contain the following properties:

  - `Timestamp`
  - `Data` - **Transactions**
  - `Hash` - It should be built by the following properties (the hash of the previous block, the current data (transactions), and the current timestamp. Why do we need to include the previous block hash in the current hash? It’s a good question: It ensures that the block will be unchanged during the time. If we change the hash of block 1, we then need to recalculate all the hashes of the next blocks, so this is a good way of keeping the immutability. It’s your choice what library you will use for hashing.
  - **Hint**: Node.js has its own implementation of hashing functionality.

- You need to create a **class** that will operate as a **`Blockchain`** network. The Blockchain class should contain the following functionalities:
  - It should be able to create the first initial block (genesis block)
  - It should be able to add a new block
  - Validation of the chain.
    - **Hint**: for this task, we can perform the following validation:
      - We can check if the hash of the current block is equal to the information of the block hashed again, or we can check the hash of the previous block if it is **equal** to the previous block hash read from the current block.
      - That’s actually one more **hint**: You need to implement getters for easy access to the current/previous hashes. So in your `Block` class, you need to have properties for them as well.
- Save your blockchain data into a database:

  - You need to save all the blocks and transactions into a database. The database type is of your choice: Relational/Non-Relational Database.
  - Your schema should support `transactions`

- You need to create a script file for testing your blockchain by adding blocks and printing them on the console.
- Your final result may look like this, and keep in mind that every blockchain starts with a `Genesis block`.

**Please Note:** Nonce is a random 32-bit number that is used as a base for hash calculations. For the simplicity of the task, you can set it initially to zero (0) and increment it on every new block.\_

- Generate a couple of blocks.

# 2. Create Rest API**:**

- Create a rest API with the following \***\*Endpoints\*\***
  **Endpoint: `/blocks/all`**
  The server should handle a GET request at an endpoint named `/**blocks**/all`. It should return a list of all **`blocks`** saved in the database.
  **Endpoint: `/block/hash`**
  The server should handle a GET request at an endpoint named `/**block**/hash`. It should return the **`block`** based on its hash, saved in the database.
