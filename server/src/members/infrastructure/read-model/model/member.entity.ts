import { PrimaryColumn, Column, Entity, OneToMany } from "typeorm";

@Entity('member')
export class MemberView{
    @PrimaryColumn()
    public id: string;
    @Column()
    public firstName: string;
    @Column()
    public lastName: string;
    @Column()
    public email: string;
    @Column()
    public phoneNumber: string;
    @Column()
    public joinDate: Date;
    @Column()
    public birthDate: Date;
    @Column()
    public addressCountry: string;
    @Column()
    public addressCity: string;
    @Column()
    public addressStreet: string;
    @Column()
    public addressPostalCode: string;
    @Column()
    public addressState?: string;
    @Column({type: 'int'})
    public status:number
    
}