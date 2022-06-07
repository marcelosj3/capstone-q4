import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("commerces")
export class Commerce {
    @PrimaryGeneratedColumn("uuid")
    readonly cnpj?: string;

    @Column()
    name: string;   
}
