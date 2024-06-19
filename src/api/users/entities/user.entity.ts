import { Board } from 'src/api/boards/entities/board.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['account'])
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @OneToMany(()=> Board, (board) => board.user)
  boards: Board[];

  @Column()
  account: string;

  @Column({ select: false })
  password: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
