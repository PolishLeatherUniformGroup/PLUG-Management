import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetMemberFeesQuery } from "../get-member-fees.query";
import { MembershipFeeView } from "../../read-model/model/membership-fee.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@QueryHandler(GetMemberFeesQuery)
export class GetMemberFeesHandler implements IQueryHandler<GetMemberFeesQuery, MembershipFeeView[]> {
    constructor(
        @InjectRepository(MembershipFeeView) private readonly memberFeeRepository: Repository<MembershipFeeView>
    ) {}

    execute(query: GetMemberFeesQuery): Promise<MembershipFeeView[]> {
        return this.memberFeeRepository.find({where: {member: {id:query.id}}, order:{year: "DESC"}});
    }
}