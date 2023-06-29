import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Block } from './Block';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    from!: string;

    @Column({ nullable: true })
    to!: string;

    @Column({ nullable: true })
    message!: string;

    @ManyToOne(() => Block, block => block.transactions)
    block!: Block;
}
