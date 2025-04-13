import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('student_profiles')
export class StudentProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column()
  user_id: string = '';

  @OneToOne(() => User, user => user.student_profile)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column()
  graduation_year: number = 0;

  @Column()
  major: string = '';

  @Column('text', { array: true, default: [] })
  skills: string[] = [];

  @Column('text', { array: true, default: [] })
  interests: string[] = [];

  @Column({ nullable: true })
  resume_url?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date = new Date();
}