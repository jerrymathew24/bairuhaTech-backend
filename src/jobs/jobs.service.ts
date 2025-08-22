import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private jobsRepo: Repository<Job>,
  ) { }

  async findAll() {
    return this.jobsRepo.find({
      order: { createdAt: 'DESC' },  // ✅ works now
      relations: ['applications'],
    });
  }

  create(data: Partial<Job>) {
    const job = this.jobsRepo.create(data);
    return this.jobsRepo.save(job);
  }

  findOne(id: number) {
    return this.jobsRepo.findOneBy({ id });
  }

  async remove(id: number) {
    await this.jobsRepo.delete(id);
    return { deleted: true };
  }
}
