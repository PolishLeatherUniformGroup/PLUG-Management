import { EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { MemberRepository } from "src/membership/repository/member.repository";
import { RequestFeeCommand } from "../impl/request-fee-command";

export class RequestFeeHandler implements ICommandHandler<RequestFeeCommand> {
    constructor(
        private readonly repository: MemberRepository,
        private readonly eventPublisher: EventPublisher) { }

    async execute(command: RequestFeeCommand) {

        const members = await (await this.repository.getAllActive())
            .map(member => (this.eventPublisher.mergeObjectContext(member)));
      

        members.forEach(async member => {
            member.requestMembershipFee(command.year, command.feeDueDate, command.feeAmount);
            await this.repository.save(member);
            member.commit();
        });
    }
}