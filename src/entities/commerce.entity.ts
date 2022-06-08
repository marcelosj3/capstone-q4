import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from './product.entity';
import { User } from './user.entity';

@Entity('commerces')
export class Commerce {
  @PrimaryGeneratedColumn('uuid')
  readonly cnpj?: string;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.commerce)
  users: User[];

  @OneToMany(() => Product, (product) => product.commerce)
  products: Product[];
}
