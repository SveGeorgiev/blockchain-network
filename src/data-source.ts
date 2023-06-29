import "reflect-metadata";
import * as dotenv from 'dotenv';
import { DataSource } from "typeorm"
import { Block } from "./entities/Block"
import { Transaction } from './entities/Transaction';

dotenv.config();

export const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'blockchain_network',
    synchronize: true,
    logging: false,
    entities: [Block, Transaction]
});