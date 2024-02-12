import { DataSource } from "typeorm";

export const EvenstorePoviders = [
    {
        provide: 'EVENT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Event),
        inject: ['DATA_SOURCE'],
    }
]