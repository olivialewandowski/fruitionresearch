import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Organization } from './organization.entity';
import { User } from './user.entity';

export enum AccessLevel {
  VIEWER = 'viewer',
  MANAGER = 'manager',
  OWNER = 'owner'
}

@Entity('organization_members')
export class OrganizationMember {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column()
  organization_id: string = '';

  @ManyToOne(() => Organization, organization => organization.members)
  @JoinColumn({ name: 'organization_id' })
  organization?: Organization;

  @Column()
  user_id: string = '';

  @ManyToOne(() => User, user => user.organization_memberships)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({
    type: 'enum',
    enum: AccessLevel
  })
  access_level: AccessLevel = AccessLevel.VIEWER;

  @Column()
  title: string = '';

  @Column({ default: true })
  pending: boolean = true;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date = new Date();
}