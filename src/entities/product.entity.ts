import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CartProduct } from './cartProduct.entity';
import { Stock } from './stock.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  readonly productId?: string;

  @Column()
  name: string;

  @Column({ default: false })
  onSale: boolean;

  @Column()
  brand: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  expiryDate: string;

  @OneToOne(() => CartProduct, (cartProduct) => cartProduct.product)
  cartProduct: CartProduct;

  @OneToOne(() => Stock, (stock) => stock.product)
  @JoinColumn()
  stock: Stock;
}
