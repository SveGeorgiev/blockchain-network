# entry-task

https://limechain.notion.site/limechain/LimeAcademy-Entry-Task-blockchain-network-7170a508221b4fa4b41d00bd422516fc

# LimeAcademy Entry Task - blockchain network

Welcome to your task for LimeAcademy. Don’t worry, you are going to have fun! 🙂

---

Your task is to **create your own blockchain and read information from it**. Simple, right?

---

First of all, what is blockchain? You are going to learn about that in detail in the Academy, but let me give you a quick overview, so you can complete your task:

- What is blockchain?
    - Think of blockchain as a chain of blocks (with some information). Wait, what is a block? Let’s assume that a block contains some kind of information and has a sequence number. For the simplicity of the task, we can limit our block to have the following properties:
        - Timestamp
        - Transactions
        - Hash
    - Wait, what is a transaction? Let’s assume for now that a transaction contains some meaningful data (something that happened and you want to write that “something” as a state to the blockchain (so it will be immutable). Keep in mind that the data is immutable (cannot be changed)!
    - What is a hash? In computer science, a hash (or hash function) is a mathematical function that takes in an input (such as a string or a file) and produces a fixed-size output, typically a string of characters or a numerical value. The output, known as a hash value, hash code, or simply hash, is unique to the input data, meaning that any change to the input data will result in a different hash value.

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

![Screenshot 2023-03-13 at 11.29.13.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/59232459-5e88-48a5-ac21-7fa1465aa571/Screenshot_2023-03-13_at_11.29.13.png)

**Please Note:** *On the screenshot above, you can see a property called “nonce”. Nonce is a random 32-bit number that is used as a base for hash calculations. For the simplicity of the task, you can set it initially to zero (0) and increment it on every new block.*

- Generate a couple of blocks.

# 2. Create Rest API**:**

- Create a rest API with the following ****Endpoints****
    
    **Endpoint: `/blocks/all`**
    
    The server should handle a GET request at an endpoint named `/**blocks**/all`. It should return a list of all **`blocks`** saved in the database. 
    
    **Endpoint: `/block/hash`**
    
    The server should handle a GET request at an endpoint named `/**block**/hash`. It should return the **`block`** based on its hash, saved in the database. 
    

# 3. Create a GitHub repo and share it with us.

- Upload your work to a GitHub repo
- Include Readme and how to run your project
- Your repo should be private and shared with handle https://github.com/limeacademy007
