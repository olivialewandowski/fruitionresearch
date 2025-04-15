import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';
import { AccessLevel } from './organization-member.entity';

@Entity('project_members')
export class ProjectMember {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column()
  project_id: string = '';

  @ManyToOne(() => Project, project => project.members)
  @JoinColumn({ name: 'project_id' })
  project?: Project;

  @Column()
  user_id: string = '';

  @ManyToOne(() => User, user => user.project_memberships)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({
    type: 'enum',
    enum: AccessLevel,
  })
  access_level: AccessLevel = AccessLevel.VIEWER;

  @Column('text', { array: true, default: [] })
  titles: string[] = [];

  @Column({ default: true })
  pending: boolean = true;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date = new Date();
}
