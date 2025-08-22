// src/jobs/job.entity.ts
import { Application } from 'src/applications/applications.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';


@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column()
  type: string;

   @CreateDateColumn()
  createdAt: Date;

  // 👇 Add relation to applications
  @OneToMany(() => Application, (application) => application.job, { cascade: true })
  applications: Application[];
}
