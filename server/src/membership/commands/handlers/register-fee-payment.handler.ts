import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RegisterFeePaymentCommand } from "../impl/register-fee-payment.command";
import { MemberRepository } from "src/membership/repository/member.repository";

@CommandHandler(RegisterFeePaymentCommand)
export class RegisterFeePaymentHandler implements ICommandHandler<RegisterFeePaymentCommand>{
    constructor(
        private readonly repository: MemberRepository,
        private readonly eventPublisher: EventPublisher
    ) { }
    async execute(command: RegisterFeePaymentCommand): Promise<any> {
        const member = this.eventPublisher.mergeObjectContext(await this.repository.get(command.memberId));
        member.registerMembershipFeePayment(command.feeId, command.paidAmount, command.paymentDate);
        await this.repository.save(member);
        member.commit();
    }

}