import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column()
  enquiries: string;

  @Column()
  companyName: string;

  @Column()
  email: string;

  @Column()
  country: string;

  @Column({ default: false })
  agreeToCommunications: boolean;
}
