import { compare } from "bcrypt";
import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { Cart } from "./cart.entity";
import { Order } from "./order.entity";

export enum CompanyRole{
    ADMIN = "admin",
    MANAGER = "manager",
    EMPLOYEE = "employee",
    CLIENT = "client",
}


@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    readonly userId?: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    cpf: string;

    @Column()
    password: string;

    @Column({default: true})
    isActive: boolean;

    @Column({default: false})
    isEmployee: boolean;

    @Column({default: CompanyRole.CLIENT})
    companyRole: CompanyRole;

    @ManyToMany(() => Address, (address) => address.user, {lazy: true})
    address: Address[]

    @OneToMany(() => Order, (order) => order.user, {lazy: true})
    orders: Order[]

    @OneToMany(() => Cart, (cart) => cart.user)
    cart: Cart[]

    comparePassword = async (password: string): Promise<boolean> => await compare(password, this.password);

}


