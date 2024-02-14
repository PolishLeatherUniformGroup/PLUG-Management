import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { MemberSuspensionAppealCancelled } from "src/membership/domain/events";
import { MemberSuspensionView } from "../model/member-suspension.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@EventsHandler(MemberSuspensionAppealCancelled)
export class MemberSuspensionAppealCancelledProjection implements IEventHandler<MemberSuspensionAppealCancelled> {
    constructor(
        @InjectRepository(MemberSuspensionView) private readonly memberSuspensionRepository: Repository<MemberSuspensionView>
    ) {
    }

    async handle(event: MemberSuspensionAppealCancelled) {
        const suspension = await this.memberSuspensionRepository.findOne({ where: { id: event.suspensionId } });
        if (suspension) {
            suspension.appealSuccessful = false;
            await this.memberSuspensionRepository.save(suspension);
        }
    }
}