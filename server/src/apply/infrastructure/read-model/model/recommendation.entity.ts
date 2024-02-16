import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ApplicantView } from './applicant.entity';

@Entity('recommendation')
export class RecommendationView {
  @PrimaryColumn()
  id: string;
  @Column()
  cardNumber: string;
  @Column()
  requestDate?: Date;
  @Column({ nullable: true, default: false })
  status?: boolean;
  @ManyToOne(() => ApplicantView, (applicant) => applicant.id)
  applicant: ApplicantView;
}
