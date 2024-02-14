import { IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { MemberCardAssigned } from "src/members/domain/events/member-card-assigned";
import { MemberView } from "../model/member.entity";
import { Repository } from "typeorm";

export class MemberCardAssignedProjection  implements IEventHandler<MemberCardAssigned>{
    constructor(
        @InjectRepository(MemberView) private readonly memberRepository: Repository<MemberView>
    ) {}
    async handle(event: MemberCardAssigned) {
        const member = await this.memberRepository.findOne({where: {id: event.id}});
        if(!member) {throw new Error('Member not found');}
        member.cardNumber = event.cardNumber.toString();
        await this.memberRepository.save(member);
    }
}