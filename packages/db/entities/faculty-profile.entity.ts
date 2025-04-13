import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('faculty_profiles')
export class FacultyProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column()
  user_id: string = '';

  @OneToOne(() => User, user => user.faculty_profile)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ nullable: true })
  department?: string;

  @Column({ nullable: true })
  research_interests?: string;

  @Column({ nullable: true })
  additional_info?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date = new Date();
}