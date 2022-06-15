import {
  Column,
  Entity,
  ManyToMany,
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
  state: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  street: string;

  @Column({ type: 'int' })
  houseNumber: number;

  @Column()
  zipCode: string;

  @Column({ nullable: true })
  additionalAddressData: string;

  @Column({ default: false })
  isMain: boolean;

  @ManyToMany(() => User, (user) => user.address, { lazy: true })
  user: User[];

  @OneToOne(() => Supplier, (supplier) => supplier.address)
  supplier: Supplier;
}
