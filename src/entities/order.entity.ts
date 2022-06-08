import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Cart } from './cart.entity';
import { User } from './user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  readonly orderId?: string;

  @ManyToOne(() => User, (user) => user.orders, { lazy: true })
  user: User;

  @OneToOne(() => Cart, (cart) => cart.order)
  @JoinColumn()
  cart: Cart;
}
