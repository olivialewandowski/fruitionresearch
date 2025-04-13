import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { University } from './university.entity';
import { User } from './user.entity';
import { OrganizationMember } from './organization-member.entity';
import { Project } from './project.entity';
import { ApplicationQuestion } from './application-question.entity';

export enum OrganizationType {
  INITIATIVE = 'initiative',
  LAB = 'lab',
  CENTER = 'center',
  PROGRAM = 'program',
  DEPARTMENT = 'department'
}

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column()
  name: string = '';

  @Column()
  university_id: string = '';

  @ManyToOne(() => University, university => university.organizations)
  @JoinColumn({ name: 'university_id' })
  university?: University;

  @Column({
    type: 'enum',
    enum: OrganizationType
  })
  type: OrganizationType = OrganizationType.INITIATIVE;

  @Column()
  creator_id: string = '';

  @ManyToOne(() => User, user => user.created_organizations)
  @JoinColumn({ name: 'creator_id' })
  creator?: User;

  @Column({ default: false })
  is_archived: boolean = false;

  @OneToMany(() => OrganizationMember, member => member.organization)
  members: OrganizationMember[] = [];

  @OneToMany(() => Project, project => project.organization)
  projects: Project[] = [];

  @OneToMany(() => ApplicationQuestion, question => question.organization)
  application_questions: ApplicationQuestion[] = [];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date = new Date();
}