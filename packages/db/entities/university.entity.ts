import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Organization } from './organization.entity';

@Entity('universities')
export class University {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column()
  name: string = '';

  @Column({ unique: true })
  domain: string = '';

  @OneToMany(() => User, user => user.university)
  users: User[] = [];

  @OneToMany(() => Organization, organization => organization.university)
  organizations: Organization[] = [];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date = new Date();
}