import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { MemberExpulsionAppealRejected } from "src/membership/domain/events";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MemberView } from "../model/member.entity";
import { MemberStatus } from "src/membership/domain/model/member-status";
import { MemberExpulsionView } from "../model/member-expulsion.entity";

@EventsHandler(MemberExpulsionAppealRejected)
export class MemberExpulsionAppealRejectedProjection implements IEventHandler<MemberExpulsionAppealRejected> {
    constructor(
        @InjectRepository(MemberView) private memberViewRepository: Repository<MemberView>,
        @InjectRepository(MemberExpulsionView) private readonly memberExpulsionRepository: Repository<MemberExpulsionView>
    ) {
    }

    async handle(event: MemberExpulsionAppealRejected) {
        const member = await this.memberViewRepository.findOne({ where: { id: event.id } });
        if (member) {
            const expulsion = await this.memberExpulsionRepository.findOne({ where: { id: event.expulsionId } });
            if (expulsion) {
                expulsion.appealSuccessful = false;
                expulsion.appealDecisionDate = event.date;
                expulsion.appealDecision = event.decision;
                await this.memberExpulsionRepository.save(expulsion);
            }
            member.status = MemberStatus.Deleted;
            await this.memberViewRepository.save(member);
        }
    }
}