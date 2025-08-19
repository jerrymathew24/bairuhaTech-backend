import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from './contact.entity';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() body: Partial<Contact>) {
    const contact = await this.contactService.create(body);
    return { message: 'Contact saved successfully!', contact };
  }
}
