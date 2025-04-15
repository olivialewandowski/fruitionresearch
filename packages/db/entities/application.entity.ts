import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Position } from './position.entity';
import { User } from './user.entity';
import { ApplicationAnswer } from './application-answer.entity';

export enum ApplicationStatus {
  PENDING = 'pending',
  INTERESTED = 'interested',
  NOT_INTERESTED = 'not_interested',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column()
  position_id: string = '';

  @ManyToOne(() => Position, position => position.applications)
  @JoinColumn({ name: 'position_id' })
  position?: Position;

  @Column()
  applicant_id: string = '';

  @ManyToOne(() => User, user => user.applications)
  @JoinColumn({ name: 'applicant_id' })
  applicant?: User;

  @Column({ nullable: true })
  interest_statement?: string;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  status: ApplicationStatus = ApplicationStatus.PENDING;

  @Column({ type: 'timestamptz', nullable: true })
  viewed_at?: Date;

  @OneToMany(() => ApplicationAnswer, answer => answer.application)
  answers: ApplicationAnswer[] = [];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date = new Date();
}
