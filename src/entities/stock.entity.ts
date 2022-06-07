import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("stocks")
export class Stock {
    @PrimaryGeneratedColumn("uuid")
    readonly stockId?: string;

    @Column()
    quantity: number;

    @Column()
    unityValueSupplier: number;

    @Column({type: "int", default: 30})
    increaseValuePercentage: number;

    @Column({default: true})
    isAvailable: boolean;
}
