import { ICommand } from "@nestjs/cqrs";
import { MemberCard } from "src/members/domain/model/member-card";
import { MemberId } from "src/members/domain/model/member-id";

export class AssignCardNumberCommand implements ICommand{
  constructor(public readonly id: MemberId,
    public readonly card:MemberCard) {}
}