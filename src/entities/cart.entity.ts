import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartProduct } from "./cartProduct.entity";
import { Order } from "./order.entity";
import { User } from "./user.entity";


@Entity("carts")
export class Cart {
    @PrimaryGeneratedColumn("uuid")
    readonly cartId?: string;

    @Column({default: false})
    isPaid: boolean;

    @Column({type: "float"})
    totalPrice: number;

    @Column({type: "float"})
    shippingFee: number;

    @ManyToOne(() => User, (user) => user.cart)
    user: User;

    @OneToOne(() => Order, (order) => order.cart)
    order: Order

    @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart)
    cartProducts: CartProduct[]

}
