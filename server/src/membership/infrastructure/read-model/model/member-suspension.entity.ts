import { Column, Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { MemberView } from './member.entity';

@Entity('member_suspensions')
export class MemberSuspensionView {
  @PrimaryColumn()
  public id: string;
  @Column()
  public suspensionDate: Date;
  @Column()
  public reason: string;
  @Column()
  public suspensionEndDate: Date;
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
  @ManyToOne(type => MemberView, member => member.id)
  public member: MemberView;
}