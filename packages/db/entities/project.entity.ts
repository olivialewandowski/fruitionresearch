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
import { Organization } from './organization.entity';
import { User } from './user.entity';
import { ProjectTag } from './project-tag.entity';
import { ProjectMember } from './project-member.entity';
import { Position } from './position.entity';
import { ApplicationQuestion } from './application-question.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column()
  title: string = '';

  @Column()
  description: string = '';

  @Column({ nullable: true })
  organization_id?: string;

  @ManyToOne(() => Organization, organization => organization.projects, {
    nullable: true,
  })
  @JoinColumn({ name: 'organization_id' })
  organization?: Organization;

  @Column({ type: 'timestamptz', nullable: true })
  start_date?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  end_date?: Date;

  @Column()
  creator_id: string = '';

  @ManyToOne(() => User, user => user.created_projects)
  @JoinColumn({ name: 'creator_id' })
  creator?: User;

  @Column({ nullable: true })
  lead_id?: string;

  @ManyToOne(() => User, user => user.led_projects, { nullable: true })
  @JoinColumn({ name: 'lead_id' })
  lead?: User;

  @Column({ nullable: true })
  manager_id?: string;

  @ManyToOne(() => User, user => user.managed_projects, { nullable: true })
  @JoinColumn({ name: 'manager_id' })
  manager?: User;

  @Column({ default: false })
  is_archived: boolean = false;

  @OneToMany(() => ProjectTag, tag => tag.project)
  tags: ProjectTag[] = [];

  @OneToMany(() => ProjectMember, member => member.project)
  members: ProjectMember[] = [];

  @OneToMany(() => Position, position => position.project)
  positions: Position[] = [];

  @OneToMany(() => ApplicationQuestion, question => question.project)
  application_questions: ApplicationQuestion[] = [];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date = new Date();
}
