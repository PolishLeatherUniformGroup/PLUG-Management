import { DataSource } from 'typeorm';
import { ApplicantView } from '../../apply/infrastructure/read-model/model/applicant.entity';
import { StorableEvent } from '../../eventstore/interfaces/storable-event';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'h27.seohost.pl',
  port: 3306,
  username: 'srv58017_plug_app',
  password: 'nijfos-tUqfyr-picva5',
  database: 'srv58017_plug_app',
  synchronize: true,
  entities: [ApplicantView, StorableEvent],
});
