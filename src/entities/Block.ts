import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from './Transaction';

@Entity()
export class Block {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'bigint' })
    timestamp: number;

    @Column({ nullable: true })
    previousHash: string | null;

    @OneToMany(() => Transaction, transaction => transaction.block, { eager: true })
    transactions: Transaction[];
}
