import { Injectable } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { GetMemberByCardQuery } from "src/membership/infrastructure/query/get-member-by-card.query";
import { MemberView } from "src/membership/infrastructure/read-model/model/member.entity";

@Injectable()
export class VerificationService{
    constructor(private readonly queryBus:QueryBus) {}

    async verifyCardNumbers(cardNumbers:string[]):Promise<MemberView[]> {
        const locatedMembers:MemberView[]=[];
        for(const cardNumber of cardNumbers) {
            const member = await this.verifyCardNumber(cardNumber);
            if(member !== null) {
                locatedMembers.push(member);
            }
        }
        return locatedMembers;
    }
    async verifyCardNumber(cardNumber:string):Promise<MemberView|null> {
        const query = new GetMemberByCardQuery(cardNumber);
        const memeber = await this.queryBus.execute(query);
        return memeber;
    }
}