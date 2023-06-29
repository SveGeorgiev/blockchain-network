import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from './Transaction';

@Entity()
export class Block {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'bigint' })
    timestamp!: number;

    @Column()
    hash!: string;

    @Column({ type: 'varchar', nullable: true })
    previousHash!: string | null;

    @Column()
    nonce!: number;

    @OneToMany(() => Transaction, transaction => transaction.block, { eager: true })
    transactions!: Transaction[];
}
