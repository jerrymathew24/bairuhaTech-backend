import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from 'src/jobs/job.entity';
import { Application } from './applications.entity';
import { unlink } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private appsRepo: Repository<Application>,
    @InjectRepository(Job)
    private jobsRepo: Repository<Job>,
  ) {}

  async create(
    jobId: string | number,
    data: { name: string; email: string },
    resume: string,
  ) {
    const numericJobId = Number(jobId);
    if (isNaN(numericJobId)) {
      throw new BadRequestException(`Invalid jobId: ${jobId}`);
    }

    const job = await this.jobsRepo.findOne({ where: { id: numericJobId } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${numericJobId} not found`);
    }

    try {
      const app = this.appsRepo.create({
        applicantName: data.name,
        email: data.email,
        resumePath: resume,
        job,
        appliedAt: new Date(),
      });
      return await this.appsRepo.save(app);
    } catch (err) {
      console.error('Error saving application:', err);
      throw new InternalServerErrorException('Failed to create application');
    }
  }

  async findAll() {
    return this.appsRepo.find({ relations: ['job'], order: { appliedAt: 'DESC' } });
  }

  // Delete an application and its resume file
  async remove(id: number) {
    const app = await this.appsRepo.findOne({ where: { id } });
    if (!app) throw new NotFoundException(`Application with ID ${id} not found`);

    try {
      // Delete resume file
      const filePath = join(process.cwd(), 'uploads/resumes', app.resumePath);
      await unlink(filePath).catch(() => {}); // ignore if file not exists
      return this.appsRepo.remove(app);
    } catch (err) {
      console.error('Error deleting application:', err);
      throw new InternalServerErrorException('Failed to delete application');
    }
  }
}
