import { Controller, Post, Body, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from './contact.entity';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() body: Partial<Contact>) {
    const contact = await this.contactService.create(body);
    return { message: 'Contact saved successfully!', contact };
  }

  @Get('submissions')
  @UseGuards(AdminGuard)
  async getAll() {
    return this.contactService.findAll();
  }

  // ✅ Delete contact submission
  @Delete('submissions/:id')
  @UseGuards(AdminGuard)
  async delete(@Param('id') id: number) {
    const deleted = await this.contactService.delete(id);
    if (deleted) return { message: 'Contact deleted successfully!' };
    return { message: 'Contact not found' };
  }
}
