import { IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { MembershipFeePaid } from "src/members/domain/events";
import { MembershipFeeView } from "../model/membership-fee.entity";
import { Repository } from "typeorm";

export class MembershipFeePaidProjection implements IEventHandler<MembershipFeePaid>{
    constructor(
        @InjectRepository(MembershipFeeView) private readonly repository: Repository<MembershipFeeView>
    ) { }

    async handle(event: MembershipFeePaid) {
        const fee = await this.repository.findOne({ where: { id: event.feeId } });
        if (!fee) {
            throw new Error('Membership fee not found');
        }
        fee.paidAmount = event.amount.amount;
        fee.paidDate = event.paidDate;
        this.repository.save(fee);
    }

}