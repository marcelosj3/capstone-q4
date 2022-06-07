import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("suppliers")
export class Supplier {
    @PrimaryGeneratedColumn("uuid")
    readonly supplierId?: string;

    @Column()
    name: string;

    @Column()
    cnpj: string;
}
