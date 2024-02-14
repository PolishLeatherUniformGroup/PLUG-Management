import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { MembershipExpired } from "src/membership/domain/events/membership-expired.event";
import { MemberView } from "../model/member.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { MemberStatus } from "src/membership/domain/model/member-status";

@EventsHandler(MembershipExpired)
export class MembershipExpiredProjection implements IEventHandler<MembershipExpired>{
    constructor(
        @InjectRepository(MemberView) private readonly memberRepository: Repository<MemberView>
    ) { }

    async handle(event: MembershipExpired) {
        const member = await this.memberRepository.findOne({ where: { id: event.id } });
        if (member) {
            member.status = MemberStatus.Expired;
            member.expireDate = event.date;
            await this.memberRepository.save(member);
        }
    }
}