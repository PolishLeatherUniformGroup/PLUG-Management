import { ApplicantView } from "src/apply/infrastructure/read-model/model/applicant.entity"
import { DataSource } from "typeorm"
import { Event } from "../eventstore/event.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "h27.seohost.pl",
    port: 3306,
    username: "srv58017_plug_app",
    password: "nijfos-tUqfyr-picva5",
    database: "srv58017_plug_app",
    synchronize: true,
    entities: [ApplicantView, Event]
});
