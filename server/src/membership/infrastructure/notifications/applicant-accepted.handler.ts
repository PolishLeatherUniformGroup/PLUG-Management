import { CommandBus, IEventHandler, QueryBus } from "@nestjs/cqrs";
import { randomUUID } from "crypto";
import { ApplicantAccepted } from "src/apply/domain/events";
import { ApplicantDto } from "src/apply/infrastructure/dto/applicant.dto";
import { GetApplicantQuery } from "src/apply/infrastructure/query/get-applicant.query";
import { CreateMemberCommand } from "src/membership/application/command/create-member.command";
import { Member } from "src/membership/domain/model/member";
import { MemberId } from "src/membership/domain/model/member-id";
import { MembershipFee } from "src/membership/domain/model/membership-fee";
import { Address } from "src/shared/address";
import { Money } from "src/shared/money";

export class ApplicantAcceptedHandler implements IEventHandler<ApplicantAccepted>{

    constructor(private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus) {
    }

    async handle(event: ApplicantAccepted) {
        const query = new GetApplicantQuery(event.id);
        const applicant: ApplicantDto = await this.queryBus.execute(query);
        const memberId = MemberId.fromUUID(randomUUID());
        const command = new CreateMemberCommand(
            memberId,
            applicant.firstName,
            applicant.lastName,
            applicant.email,
            applicant.phoneNumber,
            applicant.decisionDate || applicant.appealDecisionDate || new Date(),
            applicant.birthDate,
            Address.create({
                country: applicant.addressCountry,
                city: applicant.addressCity,
                street: applicant.addressStreet,
                postalCode: applicant.addressPostalCode,
                state: applicant.addressState
            }),
            MembershipFee.initialFeeForMember(memberId,
                Money.create(applicant.requiredFeeAmount ?? 0, applicant.feeCurrency ?? 'PLN'),
                Money.create(applicant.paidFeeAmount ?? 0, applicant.feeCurrency ?? 'PLN'),
                applicant.feePaidDate || new Date())
        );
        await this.commandBus.execute(command);
    }

}