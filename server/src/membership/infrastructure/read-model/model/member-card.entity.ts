import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('cards')
export class MemberCardNumber {
  @Column({ type: 'varchar', length: 4 })
  @PrimaryColumn()
  public prefix: string;
  @Column({ type: 'int', default: 0 })
  public nextCard: number;
}
