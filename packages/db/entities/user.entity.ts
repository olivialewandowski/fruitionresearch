import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { University } from './university.entity';
import { StudentProfile } from './student-profile.entity';
import { FacultyProfile } from './faculty-profile.entity';
import { Organization } from './organization.entity';
import { OrganizationMember } from './organization-member.entity';
import { Project } from './project.entity';
import { ProjectMember } from './project-member.entity';
import { Application } from './application.entity';
import { UserPreference } from './user-preference.entity';
import { UserSavedPosition } from './user-saved-position.entity';

export enum UserRole {
  STUDENT = 'student',
  FACULTY = 'faculty',
  ADMIN = 'admin'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column({ unique: true })
  auth_id: string = '';

  @Column({ unique: true })
  email: string = '';

  @Column()
  first_name: string = '';

  @Column()
  last_name: string = '';

  @Column({
    type: 'enum',
    enum: UserRole
  })
  role: UserRole = UserRole.STUDENT;

  @Column({ nullable: true })
  university_id?: string;

  @ManyToOne(() => University, university => university.users)
  @JoinColumn({ name: 'university_id' })
  university?: University;

  @OneToOne(() => StudentProfile, profile => profile.user)
  student_profile?: StudentProfile;

  @OneToOne(() => FacultyProfile, profile => profile.user)
  faculty_profile?: FacultyProfile;

  @OneToMany(() => Organization, organization => organization.creator)
  created_organizations: Organization[] = [];

  @OneToMany(() => OrganizationMember, member => member.user)
  organization_memberships: OrganizationMember[] = [];

  @OneToMany(() => Project, project => project.creator)
  created_projects: Project[] = [];

  @OneToMany(() => Project, project => project.lead)
  led_projects: Project[] = [];

  @OneToMany(() => Project, project => project.manager)
  managed_projects: Project[] = [];

  @OneToMany(() => ProjectMember, member => member.user)
  project_memberships: ProjectMember[] = [];

  @OneToMany(() => Application, application => application.applicant)
  applications: Application[] = [];

  @OneToMany(() => UserPreference, preference => preference.user)
  preferences: UserPreference[] = [];

  @OneToMany(() => UserSavedPosition, savedPosition => savedPosition.user)
  saved_positions: UserSavedPosition[] = [];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date = new Date();
}