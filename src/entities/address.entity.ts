import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Supplier } from './supplier.entity';
import { User } from './user.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  readonly addressId?: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  zipCode: string;

  @Column()
  houseNumber: number;

  @Column()
  additionalAddressData: string;

  @Column({ default: false })
  isMain: boolean;

  @ManyToMany(() => User, (user) => user.address, { lazy: true })
  user: User[];

  @OneToOne(() => Supplier, (supplier) => supplier.address)
  supplier: Supplier;
}
