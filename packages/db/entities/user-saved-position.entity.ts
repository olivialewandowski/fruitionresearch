// packages/db/entities/user-saved-position.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Position } from './position.entity';

@Entity('user_saved_positions')
export class UserSavedPosition {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column()
  user_id: string = '';

  @ManyToOne(() => User, user => user.saved_positions)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column()
  position_id: string = '';

  @ManyToOne(() => Position, position => position.saved_by_users)
  @JoinColumn({ name: 'position_id' })
  position?: Position;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date();
}
