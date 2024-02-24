import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MemberView } from "../../read-model/model/member.entity";
import { GetMemberByCardQuery } from "../get-member-by-card.query";
import { GetMemberQuery } from "../get-member.query";

@QueryHandler(GetMemberByCardQuery)
export class GetMemberByCardHandler implements IQueryHandler<GetMemberByCardQuery, MemberView | null> {
    constructor(@InjectRepository(MemberView)private readonly memberRepository: Repository<MemberView>) {}
  
    async execute(query: GetMemberByCardQuery): Promise<MemberView|null> {
        const memberCard = query.card;
        const member = await this.memberRepository.findOne({where:{cardNumber: memberCard}});      
        
        return member;
    }
}