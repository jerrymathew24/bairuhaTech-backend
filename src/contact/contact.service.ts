import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Contact } from "./contact.entity";
import { Repository } from "typeorm";

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

  // ✅ Delete by ID
async delete(id: number): Promise<boolean> {
  const result = await this.contactRepo.delete(id);
  // `affected` might be undefined, so we check safely
  return (result.affected ?? 0) > 0;
}

}
