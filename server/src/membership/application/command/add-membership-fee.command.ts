import { ICommand } from "@nestjs/cqrs";
import { Money } from "../../../shared/money";
import { MemberId } from "../../domain/model/member-id";

export class AddMembershipFeeCommand implements ICommand {
  constructor(
    public readonly memberId: MemberId,
    public readonly year: number,
    public readonly amount: Money,
    public readonly dueDate: Date,
  ) {}
}