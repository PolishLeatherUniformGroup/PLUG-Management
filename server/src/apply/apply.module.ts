import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ApplyController } from "./apply.controller";

@Module({
    imports: [CqrsModule],
    controllers: [ApplyController],
    providers:[],
})
export class ApplyModule{}