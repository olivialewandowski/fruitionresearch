import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ApplicationQuestion } from './application-question.entity';

@Entity('question_options')
export class QuestionOption {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column()
  question_id: string = '';

  @ManyToOne(() => ApplicationQuestion, question => question.options)
  @JoinColumn({ name: 'question_id' })
  question?: ApplicationQuestion;

  @Column()
  option_text: string = '';

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date();
}
