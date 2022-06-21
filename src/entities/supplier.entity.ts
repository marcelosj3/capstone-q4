import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Address } from './address.entity';
import { Stock } from './stock.entity';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  readonly supplierId?: string;

  @Column()
  name: string;

  @Column()
  // TODO insert unique value
  cnpj: string;

  @OneToMany(() => Stock, (stock) => stock.supplier)
  stock: Stock[];

  @OneToOne(() => Address, (address) => address.supplier)
  @JoinColumn()
  address: Address;
}
