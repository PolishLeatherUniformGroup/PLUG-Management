import { Column, Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { MemberView } from './member.entity';

@Entity('member_expulsions')
export class MemberExpulsionView {
  @PrimaryColumn()
  public id: string;
  @Column()
  public expulsionDate: Date;
  @Column()
  public reason: string;
  @Column()
  public appealDeadline: Date;
  @Column()
  public appealDate?: Date;
  @Column()
  public appealJustification?: string;
  @Column()
  public appealDecision?: string;
  @Column()
  public appealDecisionDate?: Date;
  @Column()
  public appealSuccessful?: boolean;
  @ManyToOne(() => MemberView, (member) => member.memberId)
  public member: MemberView;
}
