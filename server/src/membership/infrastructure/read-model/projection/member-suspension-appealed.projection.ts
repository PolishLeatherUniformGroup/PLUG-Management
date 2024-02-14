import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { MemberSuspensionAppealed } from "src/membership/domain/events";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MemberSuspensionView } from "../model/member-suspension.entity";

@EventsHandler(MemberSuspensionAppealed)
export class MemberSuspensionAppealedProjection implements IEventHandler<MemberSuspensionAppealed> {
    constructor(
        @InjectRepository(MemberSuspensionView) private readonly memberSuspensionRepository: Repository<MemberSuspensionView>
    ) {
    }

    async handle(event: MemberSuspensionAppealed) {
        const suspension = await this.memberSuspensionRepository.findOne({ where: { id: event.suspensionId } });
        if (suspension) {
            suspension.appealDate = event.date;
            suspension.appealJustification = event.justification;
            await this.memberSuspensionRepository.save(suspension);
        }
    }
}