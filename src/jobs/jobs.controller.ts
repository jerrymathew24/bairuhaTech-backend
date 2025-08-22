import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './job.entity';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  findAll(): Promise<Job[]> {
    return this.jobsService.findAll();
  }

  @Post()
  create(@Body() data: Partial<Job>): Promise<Job> {
    return this.jobsService.create(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}
