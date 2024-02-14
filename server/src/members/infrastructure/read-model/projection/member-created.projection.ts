import { CommandBus, EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { MemberCreated } from "src/members/domain/events/member-created.event";
import { Repository } from "typeorm";
import { MemberView } from "../model/member.entity";
import { MembershipFeeView } from "../model/membership-fee.entity";
import { MemberStatus } from "src/members/domain/model/member-status";
import { MemberCardNumber } from "../model/member-card.entity";
import { MemberCard } from "src/members/domain/model/member-card";
import { AssignCardNumberCommand } from "src/members/application/command/assign-card-number.command";
import { MemberId } from "src/members/domain/model/member-id";

@EventsHandler(MemberCreated)
export class MemberCreatedProjection implements IEventHandler<MemberCreated> {
    constructor(
        @InjectRepository(MemberView) private memberRepository: Repository<MemberView>,
        @InjectRepository(MembershipFeeView) private membershipFeeRepository: Repository<MembershipFeeView>,
        @InjectRepository(MemberCardNumber) private memberCardRepository: Repository<MemberCardNumber>,
        private readonly commandBus: CommandBus
    ) { }
    async handle(event: MemberCreated) {
        try {
            const card = await this.memberCardRepository.findOne({ where: { prefix: 'PLUG' } });

            const member = new MemberView();
            member.id = event.id;
            member.firstName = event.firstName;
            member.lastName = event.lastName;
            member.email = event.email;
            member.phoneNumber = event.phoneNumber;
            member.joinDate = event.joinDate;
            member.birthDate = event.birthDate;
            member.addressCountry = event.address.country;
            member.addressCity = event.address.city;
            member.addressStreet = event.address.street;
            member.addressPostalCode = event.address.postalCode;
            member.addressState = event.address.state;
            member.status = MemberStatus.Active;
            if (card) {
                const command = new AssignCardNumberCommand(MemberId.fromString(member.id), MemberCard.create(card.prefix, card.nextCard));
                await this.commandBus.execute(command);
                card.nextCard++;
                this.memberCardRepository.save(card);
            }
            await this.memberRepository.save(member);
            
            const membershipFee = new MembershipFeeView();
            membershipFee.id = event.initialFee.id;
            membershipFee.year = event.initialFee.year;
            membershipFee.dueAmount = event.initialFee.dueAmount.amount;
            membershipFee.dueDate = event.initialFee.dueDate;
            membershipFee.currency = event.initialFee.dueAmount.currency;
            membershipFee.paidAmount = event.initialFee.paidAmount?.amount;
            membershipFee.paidDate = event.initialFee.paidDate;
            membershipFee.member = member;
            await this.membershipFeeRepository.save(membershipFee);
        } catch (error) {
            console.error(error);
        }
    }
}