import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Cart } from './cart.entity';
import { Product } from './product.entity';

@Entity('cartProducts')
export class CartProduct {
  @PrimaryGeneratedColumn('uuid')
  readonly cartProductsId?: string;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.cartProducts)
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cartProduct)
  product: Product;
}
