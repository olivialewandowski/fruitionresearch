import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_preferences')
export class UserPreference {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column()
  user_id: string = '';

  @ManyToOne(() => User, user => user.preferences)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column()
  preference_type: string = '';

  @Column()
  preference_value: string = '';

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date = new Date();
}
