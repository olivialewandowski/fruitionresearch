import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Application } from './application.entity';
import { ApplicationQuestion } from './application-question.entity';

@Entity('application_answers')
export class ApplicationAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column()
  application_id: string = '';

  @ManyToOne(() => Application, application => application.answers)
  @JoinColumn({ name: 'application_id' })
  application: Application = new Application();

  @Column()
  question_id: string = '';

  @ManyToOne(() => ApplicationQuestion, question => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: ApplicationQuestion = new ApplicationQuestion();

  @Column({ nullable: true })
  answer_text?: string;

  @Column('uuid', { array: true, nullable: true })
  selected_options?: string[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date = new Date();
}
