import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Organization } from './organization.entity';
import { Project } from './project.entity';
import { Position } from './position.entity';
import { QuestionOption } from './question-option.entity';
import { ApplicationAnswer } from './application-answer.entity';

export enum QuestionType {
  SHORT_ANSWER = 'short_answer',
  CHECKBOX = 'checkbox',
  MULTIPLE_CHOICE = 'multiple_choice'
}

@Entity('application_questions')
export class ApplicationQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column({ nullable: true })
  organization_id?: string;

  @ManyToOne(() => Organization, organization => organization.application_questions, { nullable: true })
  @JoinColumn({ name: 'organization_id' })
  organization?: Organization;

  @Column({ nullable: true })
  project_id?: string;

  @ManyToOne(() => Project, project => project.application_questions, { nullable: true })
  @JoinColumn({ name: 'project_id' })
  project?: Project;

  @Column({ nullable: true })
  position_id?: string;

  @ManyToOne(() => Position, position => position.application_questions, { nullable: true })
  @JoinColumn({ name: 'position_id' })
  position?: Position;

  @Column()
  question: string = '';

  @Column({
    type: 'enum',
    enum: QuestionType
  })
  type: QuestionType = QuestionType.SHORT_ANSWER;

  @Column({ default: false })
  is_locked: boolean = false;

  @OneToMany(() => QuestionOption, option => option.question)
  options: QuestionOption[] = [];

  @OneToMany(() => ApplicationAnswer, answer => answer.question)
  answers: ApplicationAnswer[] = [];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date = new Date();
}
