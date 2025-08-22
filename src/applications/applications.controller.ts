import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Res,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApplicationsService } from './applications.service';
import { extname, join } from 'path';
import type { Response } from 'express';
import { AdminGuard } from '../auth/admin.guard';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  // Create application
  @Post()
  @UseInterceptors(
    FileInterceptor('resume', {
      storage: diskStorage({
        destination: './uploads/resumes',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(pdf|doc|docx)$/i)) {
          return cb(new Error('Only PDF, DOC, DOCX files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async apply(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { name: string; email: string; jobId: string | number },
  ) {
    return this.applicationsService.create(body.jobId, body, file.filename);
  }

  // Admin: list all applications
  @UseGuards(AdminGuard)
  @Get()
  async getAll() {
    return this.applicationsService.findAll();
  }

  // Admin: delete an application
  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.applicationsService.remove(Number(id));
  }

  // Admin: download resume
  @UseGuards(AdminGuard)
  @Get('download/:filename')
  async downloadResume(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'uploads/resumes', filename);
    return res.download(filePath);
  }
}
