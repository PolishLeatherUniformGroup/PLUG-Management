import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity('member')
export class MemberView {
  @PrimaryColumn()
  public memberId: string;
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
  @Column({ type: 'int' })
  public status: number;
  @Column({ type: 'varchar', length: 10, nullable: true, default: null, unique: true})
  public cardNumber: string;
  @Column()
  public memberType: number;
  @Column()
  public expireDate?: Date;
  @Column()
  cancelDate?: Date;
}
