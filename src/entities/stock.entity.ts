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

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'float' })
  unityValueSupplier: number;

  @Column({ type: 'int', default: 30 })
  increaseValuePercentage: number;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ type: 'float', nullable: true })
  unityValueToSell: number;

  @OneToOne(() => Product, (product) => product.stock)
  product: Product;

  @ManyToOne(() => Supplier, (supplier) => supplier.stock)
  supplier: Supplier;
}
