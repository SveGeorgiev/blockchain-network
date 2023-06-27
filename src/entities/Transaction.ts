import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Block } from './Block';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data: string;

    @ManyToOne(() => Block, block => block.transactions)
    block: Block;
}
