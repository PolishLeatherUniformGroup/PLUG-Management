import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { MembershipSuspensionAppealCancelled } from "src/membership/domain/events";
import { MemberSuspensionView } from "../model/member-suspension.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MembershipSuspensionAppealAccepted } from "src/membership/domain/events/membership-suspension-appeal-accepted.event";
import { MemberView } from "../model/member.entity";
import { MemberStatus } from "src/membership/domain/model/member-status";

@EventsHandler(MembershipSuspensionAppealAccepted)
export class MembershipSuspensionAppealAcceptedProjection implements IEventHandler<MembershipSuspensionAppealAccepted> {
    constructor(
        @InjectRepository(MemberView) private readonly memberRepository: Repository<MemberView>,
        @InjectRepository(MemberSuspensionView) private readonly memberSuspensionRepository: Repository<MemberSuspensionView>
    ) {
    }

    async handle(event: MembershipSuspensionAppealAccepted) {
        const member = await this.memberRepository.findOne({ where: { id: event.id } });
        if (member) {
            const suspension = await this.memberSuspensionRepository.findOne({ where: { id: event.suspensionId } });
            if (suspension) {
                suspension.appealSuccessful = true;
                suspension.appealDecision = event.reason;
                suspension.appealDecisionDate = event.date;
                await this.memberSuspensionRepository.save(suspension);
            }
            member.status = MemberStatus.Active;
            await this.memberRepository.save(member);
        }

    }
}