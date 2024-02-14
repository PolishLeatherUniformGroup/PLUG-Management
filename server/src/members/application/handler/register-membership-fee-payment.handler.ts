import { CommandHandler,  ICommandHandler } from "@nestjs/cqrs";
import { RegisterMembershipFeePaymentCommand } from "../command/register-membership-fee-payment.command";
import { Inject } from "@nestjs/common";
import { MEMBERS, Members } from "src/members/domain/repository/members";

@CommandHandler(RegisterMembershipFeePaymentCommand)
export class RegisterMembershipFeePaymentHandler implements ICommandHandler<RegisterMembershipFeePaymentCommand> {
    constructor(@Inject(MEMBERS)private readonly members: Members) {}

    async execute(command: RegisterMembershipFeePaymentCommand) {
        const member = await this.members.get(command.memberId);
        if(!member) {
            throw new Error('Member not found');
        }
        member.registerPaymentForMembershipFee(command.feeId, command.amount, command.paidDate);
        await this.members.save(member);
    }
}