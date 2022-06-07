import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { boolean } from "yup";
import { Order } from "./order.entity";
import { User } from "./user.entity";


@Entity("addresses")
export class Address {
    @PrimaryGeneratedColumn("uuid")
    readonly addressId?: string;

    @Column()
    city: string;

    @Column()
    street: string;

    @Column()
    zipCode: string;

    @Column()
    houseNumber: number;

    @Column()
    additionalAddressData: string;

    @Column({default: false})
    isMain: boolean

    @ManyToMany(() => User, (user) => user.address, {lazy: true})
    user: User[]    
}
