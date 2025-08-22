// src/applications/applications.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Job } from '../jobs/job.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  applicantName: string;

  @Column()
  email: string;

 
  @Column()
  resumePath: string;   // ✅ add this

  @CreateDateColumn()
  appliedAt: Date;      // ✅ add this

  // 👇 Fix relation
  @ManyToOne(() => Job, (job) => job.applications, { onDelete: 'CASCADE' })
  job: Job;
}
