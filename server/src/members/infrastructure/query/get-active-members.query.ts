import { IQuery } from "@nestjs/cqrs";
import { MemberView } from "../read-model/model/member.entity";

export class GetActiveMembersQuery  implements IQuery{
    constructor(){}
}