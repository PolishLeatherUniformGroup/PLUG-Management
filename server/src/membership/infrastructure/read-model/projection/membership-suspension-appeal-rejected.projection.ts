import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { MembershipSuspensionAppealRejected } from "src/membership/domain/events";
import { MemberSuspensionView } from "../model/member-suspension.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MemberView } from "../model/member.entity";

@EventsHandler(MembershipSuspensionAppealRejected)
export class MemberSuspensionAppealRejectedProjection implements IEventHandler<MembershipSuspensionAppealRejected> {
    constructor(
        @InjectRepository(MemberView) private readonly memberRepository: Repository<MemberView>,
        @InjectRepository(MemberSuspensionView) private readonly memberSuspensionRepository: Repository<MemberSuspensionView>
    ) {
    }

    async handle(event: MembershipSuspensionAppealRejected) {
        const suspension = await this.memberSuspensionRepository.findOne({ where: { id: event.suspensionId } });
        if (suspension) {
            suspension.appealSuccessful = true;
            suspension.appealDecision = event.reason;
            suspension.appealDecisionDate = event.date;
            await this.memberSuspensionRepository.save(suspension);
        }
    }
}