import { User } from 'src/api/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    board_id: number;
    
    @ManyToOne(() => User, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    user_id: number;

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
