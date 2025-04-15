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
import { Project } from './project.entity';
import { Application } from './application.entity';
import { ApplicationQuestion } from './application-question.entity';
import { UserSavedPosition } from './user-saved-position.entity';

export enum PositionType {
  IN_PERSON = 'in_person',
  HYBRID = 'hybrid',
  REMOTE = 'remote',
}

export enum PositionCompensationType {
  PAID = 'paid',
  VOLUNTEER = 'volunteer',
  WORK_STUDY = 'work_study',
  COURSE_CREDIT = 'course_credit',
}

@Entity('positions')
export class Position {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column()
  project_id: string = '';

  @ManyToOne(() => Project, project => project.positions)
  @JoinColumn({ name: 'project_id' })
  project?: Project;

  @Column()
  title: string = '';

  @Column()
  requirements: string = '';

  @Column({
    type: 'enum',
    enum: PositionType,
    array: true,
  })
  position_types: PositionType[] = [];

  @Column({
    type: 'enum',
    enum: PositionCompensationType,
    array: true,
  })
  compensation_types: PositionCompensationType[] = [];

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  compensation_amount?: number;

  @Column({ default: 1 })
  positions_count: number = 1;

  @Column({ default: 0 })
  positions_filled: number = 0;

  @Column({ default: true })
  collect_profile_details: boolean = true;

  @Column({ default: true })
  require_resume: boolean = true;

  @Column({ type: 'timestamptz' })
  application_close_date: Date = new Date();

  @Column({ default: false })
  is_archived: boolean = false;

  @OneToMany(() => Application, application => application.position)
  applications: Application[] = [];

  @OneToMany(() => ApplicationQuestion, question => question.position)
  application_questions: ApplicationQuestion[] = [];

  @OneToMany(() => UserSavedPosition, savedPosition => savedPosition.position)
  saved_by_users: UserSavedPosition[] = [];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date = new Date();
}
