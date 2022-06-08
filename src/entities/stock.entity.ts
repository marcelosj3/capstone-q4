import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from './product.entity';
import { Supplier } from './supplier.entity';

@Entity('stocks')
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  readonly stockId?: string;

  @Column()
  quantity: number;

  @Column()
  unityValueSupplier: number;

  @Column({ type: 'int', default: 30 })
  increaseValuePercentage: number;

  @Column({ default: true })
  isAvailable: boolean;

  @OneToOne(() => Product, (product) => product.stock)
  product: Product;

  @ManyToOne(() => Supplier, (supplier) => supplier.stock)
  supplier: Supplier;
}
