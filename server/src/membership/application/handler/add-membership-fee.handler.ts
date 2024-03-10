import { ICommandHandler } from "@nestjs/cqrs";
import { AddMembershipFeeCommand } from "../command/add-membership-fee.command";
import { StoreEventPublisher } from "../../../eventstore/store-event-publisher";
import { MemberAggregateRepository } from "../../infrastructure/repository/member-aggregate-repository";
import { MemberId } from "../../domain/model/member-id";
import { Member } from "../../domain/model/member";

export class AddMembershipFeeCommanndHandler implements ICommandHandler<AddMembershipFeeCommand> {
    constructor(
        private readonly members: MemberAggregateRepository,
        private readonly publisher: StoreEventPublisher,) { }

    async execute(command: AddMembershipFeeCommand) {
        try {
            const member = this.publisher.mergeObjectContext(await this.members.getById(Member, command.memberId.value));
            if (!member) throw new Error('Member not found');
            member.addMembershipFee(command.year, command.amount, command.dueDate);
            member.commit();
        } catch (error) {
            console.trace(error);
        }
    }
}