import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity('project_tags')
export class ProjectTag {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column()
  project_id: string = '';

  @ManyToOne(() => Project, project => project.tags)
  @JoinColumn({ name: 'project_id' })
  project?: Project;

  @Column()
  tag: string = '';

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date();
}