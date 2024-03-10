import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { OnEvent } from "@nestjs/event-emitter";
import { EventPayloads } from "../../../event-emitter/event-payloads";
import { CreateMemberCommand } from "../command/create-member.command";
import { MemberId } from "../../domain/model/member-id";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { randomUUID } from "crypto";
import { Address } from "../../../shared/address";
import { Member } from "../../domain/model/member";
import { MembershipFee } from "../../domain/model/membership-fee";
import { Money } from "../../../shared/money";
import { Repository } from "typeorm/repository/Repository";
import { MemberCardNumber } from "../../infrastructure/read-model/model/member-card.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AssignCardNumberCommand } from "../command/assign-card-number.command";
import { MemberCard } from "../../domain/model/member-card";

@Injectable()
export class MembershipService {
    constructor(
        private readonly commandBus: CommandBus,
        @InjectRepository(MemberCardNumber)
        private memberCardRepository: Repository<MemberCardNumber>,
    ) { }

    @OnEvent('system.application-approved')
    async applicantApproved(data: EventPayloads['system.application-approved']) {
        const memberId = MemberId.fromUUID(randomUUID());
        const feeAmount: number = data.initialFee.dueAmount?.ammount == undefined ? 0 : data.initialFee.dueAmount?.ammount;
        const feeCurrency: string = data.initialFee.dueAmount?.currency == undefined ? 'PLN' : data.initialFee.dueAmount?.currency;
        const feeDue = Money.create(feeAmount, feeCurrency);

        const command = new CreateMemberCommand(
            memberId,
            data.firstName,
            data.lastName,
            data.email,
            data.phoneNumber,
            data.joinDate,
            data.birthDate,
            Address.fromDto(data.address),
            MembershipFee.initialFeeForMember(
                memberId, feeDue, feeDue, data.initialFee.paidDate == undefined ? new Date() : data.initialFee.paidDate)
        );

        await this.commandBus.execute(command);

    }

    @OnEvent('membership.member-created')
    async memberCreated(data: EventPayloads['membership.member-created']) {
        const card = await this.memberCardRepository.findOne({
            where: { prefix: 'PLUG' },
          });
        if (card) {
            const command = new AssignCardNumberCommand(
                MemberId.fromString(data.memberId),
                MemberCard.create(card.prefix, card.nextCard),
            );
            await this.commandBus.execute(command);
            card.nextCard++;
            this.memberCardRepository.save(card);
        }
    }

}