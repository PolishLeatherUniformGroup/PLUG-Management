import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('applicant')
export class ApplicantView {
  @PrimaryColumn()
  public applicantId: string;
  @Column()
  public firstName: string;
  @Column()
  public lastName: string;
  @Column()
  public email: string;
  @Column()
  public phoneNumber: string;
  @Column()
  public applyDate: Date;
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
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  public requiredFeeAmount?: number;
  @Column({ type: 'varchar', length: 3, nullable: true })
  public feeCurrency?: string;
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  public paidFeeAmount?: number;
  @Column()
  public feePaidDate?: Date;
  @Column()
  public decision?: string;
  @Column()
  public decisionDate?: Date;
  @Column()
  public appealDeadline?: Date;
  @Column()
  public appealDate?: Date;
  @Column()
  public appealJustification?: string;
  @Column()
  public appealDecision?: string;
  @Column()
  public appealDecisionDate?: Date;
}
