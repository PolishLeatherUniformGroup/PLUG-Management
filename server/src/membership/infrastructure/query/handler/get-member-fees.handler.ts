import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetMemberFeesQuery } from "../get-member-fees.query";
import { MembershipFeeView } from "../../read-model/model/membership-fee.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { MembershipFeeDto } from "../../dto/membership-fee.dto";

@QueryHandler(GetMemberFeesQuery)
export class GetMemberFeesHandler implements IQueryHandler<GetMemberFeesQuery, MembershipFeeView[]> {
    constructor(
        @InjectRepository(MembershipFeeView) private readonly memberFeeRepository: Repository<MembershipFeeView>
    ) { }

    async execute(query: GetMemberFeesQuery): Promise<MembershipFeeView[]> {
        const memberId = query.id;
        let fees: MembershipFeeView[];
        const result = memberId['id'].match(/PLUG-\d{4}/);
        const isCard = result !== null && result.length > 0;
        if (isCard) {
            fees = await this.memberFeeRepository.find({
                where: { member: { cardNumber: memberId['id'] } }, order: { year: "DESC" }, relations: {
                    member: false
                }
            },);
        } else {
            fees = await this.memberFeeRepository.find({
                where: { member: { id: memberId['id']} }, order: { year: "DESC" }, relations: {
                    member: false
                }
            });
        }
        return fees;
    }
}