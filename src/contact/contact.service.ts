import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepo: Repository<Contact>,
  ) {}

  async create(data: Partial<Contact>) {
    const contact = this.contactRepo.create(data);
    return this.contactRepo.save(contact);
  }

  async findAll() {
  return this.contactRepo.find({ order: { id: 'DESC' } });
}
}
