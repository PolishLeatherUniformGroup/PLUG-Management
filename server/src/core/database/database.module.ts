import { Global, Module } from "@nestjs/common";
import { DataSource } from "typeorm";
import { AppDataSource } from './data-source';

@Global()
@Module({
    imports: [],
    providers: [
        {
            provide: DataSource,
            useFactory: async () => {
                try {
                    if (!AppDataSource.isInitialized) {
                        await AppDataSource.initialize();
                        return AppDataSource;
                    }
                } catch (error) {
                    console.error(error?.message);
                }

            },
        },
    ],
    exports: [DataSource],
})
export class DatabaseModule { }