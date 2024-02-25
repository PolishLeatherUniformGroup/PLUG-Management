import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Repository } from "typeorm";
import { MemberView } from "../../read-model/model/member.entity";
import { GetMemberQuery } from "../get-member.query";
import { InjectRepository } from "@nestjs/typeorm";


@QueryHandler(GetMemberQuery)
export class GetMemberHandler implements IQueryHandler<GetMemberQuery, MemberView | null> {
    constructor(@InjectRepository(MemberView)private readonly memberRepository: Repository<MemberView>) {}
  
    async execute(query: GetMemberQuery): Promise<MemberView|null> {
        const memberId = query.id;
        const result = memberId.match(/PLUG-\d{4}/);
        const isCard = result !== null && result.length > 0;
        if(isCard){
            return await this.memberRepository.findOne({where:{cardNumber: memberId}});
        }else{
            return await this.memberRepository.findOne({where:{id: memberId}});   ;
        }
    }
}