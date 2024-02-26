import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class StorableEvent {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  streamId: string;
  @Column()
  eventType: string;
  @Column({ type: 'text' })
  data: string;
  @Column()
  timestamp: Date;
}
