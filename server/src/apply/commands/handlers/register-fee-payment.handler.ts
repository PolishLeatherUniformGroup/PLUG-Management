import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RegisterFeePaymentCommand } from "../impl/register-fee-payment.command";
import { ApplicantRepository } from "src/apply/repository/applicant.repository";

@CommandHandler(RegisterFeePaymentCommand)
export class RegisterFeePaymentHndler implements ICommandHandler<RegisterFeePaymentCommand>{
    constructor(
        private readonly repository:ApplicantRepository,
        private readonly eventPublisher:EventPublisher
    ){}

    async execute(command: RegisterFeePaymentCommand): Promise<any> {
        const applicant = this.eventPublisher.mergeObjectContext(
            await this.repository.get(command.id)
        );

        applicant.registerFeePayment(command.feePaid,command.paidDate);
        this.repository.save(applicant);
        applicant.commit();
    }

}