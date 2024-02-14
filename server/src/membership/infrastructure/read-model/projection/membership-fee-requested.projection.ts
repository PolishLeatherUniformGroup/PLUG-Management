import { IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { MembershipFeeRequested } from "src/membership/domain/events";
import { MembershipFeeView } from "../model/membership-fee.entity";
import { MemberView } from "../model/member.entity";
import { Repository } from "typeorm";

export class MembershipFeeRequestedProjection implements IEventHandler<MembershipFeeRequested>{
    constructor(
        @InjectRepository(MemberView) private readonly memberRepository: Repository<MemberView>,
        @InjectRepository(MembershipFeeView) private readonly membershipFeeRepository: Repository<MembershipFeeView>
    ) { }

    async handle(event: MembershipFeeRequested) {
        const member = await this.memberRepository.findOne({ where: { id: event.id } });
        if (!member) {
            throw new Error('Member not found');
        }
        const membershipFee = new MembershipFeeView();
        membershipFee.id = `${event.id}-${event.year}`;
        membershipFee.year = event.year;
        membershipFee.dueAmount = event.amount.amount;
        membershipFee.dueDate = event.dueDate;
        membershipFee.currency = event.amount.currency;
        membershipFee.member = member;
        await this.membershipFeeRepository.save(membershipFee);
    }
}
