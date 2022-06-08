import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartProduct } from "./cartProduct.entity";
import { Commerce } from "./commerce.entity";
import { Stock } from "./stock.entity";


@Entity("products")
export class Product {
    @PrimaryGeneratedColumn("uuid")
    readonly productId?: string;

    @Column()
    name: string;

    @Column({unique: true})
    onSale: boolean;

    @Column()
    brand: string;

    @Column()
    category: string;

    @Column({nullable: true})
    description: string;

    @Column()
    expiryDate: string;

    @OneToOne(() => CartProduct, (cartProduct) => cartProduct.product)
    cartProduct: CartProduct

    @OneToOne(() => Stock, (stock) => stock.product)
    @JoinColumn()
    stock: Stock

    @ManyToOne(() => Commerce, (commerce) => commerce.products)
    commerce: Commerce

}
