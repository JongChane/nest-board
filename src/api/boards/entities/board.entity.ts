import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
  } from 'typeorm';
  
@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    board_idx: number;

    @Column()
    user_idx: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    read_count: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
  
    @DeleteDateColumn()
    deleted_at: Date;
}
