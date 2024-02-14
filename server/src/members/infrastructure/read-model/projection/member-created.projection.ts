import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { MemberCreated } from "src/members/domain/events/member-created.event";
import { Repository } from "typeorm";
import { MemberView } from "../model/member.entity";
import { MembershipFeeView } from "../model/membership-fee.entity";
import { MemberStatus } from "src/members/domain/model/member-status";

@EventsHandler(MemberCreated)
export class MemberCreatedProjection implements IEventHandler<MemberCreated> {
    constructor(
        @InjectRepository(MemberView) private memberRepository: Repository<MemberView>,
        @InjectRepository(MembershipFeeView) private membershipFeeRepository: Repository<MembershipFeeView>
    ) {}
    async handle(event: MemberCreated) {
        try{
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