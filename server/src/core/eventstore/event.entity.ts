import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event{

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    streamId: string;
    @Column()
    eventType: string;
    @Column()
    data:string;
    @Column()
    timestamp:Date;
}