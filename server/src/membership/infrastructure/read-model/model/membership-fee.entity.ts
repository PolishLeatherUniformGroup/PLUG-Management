import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { MemberView } from './member.entity';

@Entity('membership_fee')
export class MembershipFeeView {
  @PrimaryColumn()
  public feeId: string;
  @Column()
  public year: number;
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  public dueAmount: number;
  @Column()
  public dueDate: Date;
  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
    default: null,
  })
  public paidAmount?: number;
  @Column({ nullable: true, default: null })
  public paidDate?: Date;
  @Column({ type: 'varchar', length: 3 })
  public currency: string;
  @ManyToOne(() => MemberView, (member) => member.id)
  member: MemberView;
}
