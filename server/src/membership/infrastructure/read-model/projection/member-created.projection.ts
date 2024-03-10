import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberCreated } from 'src/membership/domain/events/member-created.event';
import { Repository } from 'typeorm';
import { MemberView } from '../model/member.entity';
import { MembershipFeeView } from '../model/membership-fee.entity';
import { MemberStatus } from 'src/membership/domain/model/member-status';
import { MemberCardNumber } from '../model/member-card.entity';
import { MemberCard } from 'src/membership/domain/model/member-card';
import { AssignCardNumberCommand } from 'src/membership/application/command/assign-card-number.command';
import { MemberType } from 'src/membership/domain/model/member-type';
import { MemberId } from '../../../domain/model/member-id';
import { IViewUpdater } from '../../../../eventstore/view/interfaces/view-updater';
import { TypedEventEmitter } from '../../../../event-emitter/typed-event-emmitter';

@EventsHandler(MemberCreated)
export class MemberCreatedProjection implements  IViewUpdater<MemberCreated> {
  constructor(
    @InjectRepository(MemberView)
    private memberRepository: Repository<MemberView>,
    @InjectRepository(MembershipFeeView)
    private membershipFeeRepository: Repository<MembershipFeeView>,
    
    private readonly emmitter: TypedEventEmitter,
  ) {}
  async handle(event: MemberCreated) {
    try {
      
      const member = new MemberView();
      member.memberId = event.id;
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
      if (event.card) {
        member.cardNumber = MemberCard.create(
          'PLUG',
          event.card,
        ).toString();
      }
      member.memberType = MemberType.Regular;
      await this.memberRepository.save(member);

      const membershipFee = new MembershipFeeView();
      membershipFee.feeId = event.initialFee.id;
      membershipFee.year = event.initialFee.year;
      membershipFee.dueAmount = event.initialFee.dueAmount.amount;
      membershipFee.dueDate = event.initialFee.dueDate;
      membershipFee.currency = event.initialFee.dueAmount.currency;
      membershipFee.paidAmount = event.initialFee.paidAmount?.amount;
      membershipFee.paidDate = event.initialFee.paidDate;
      membershipFee.member = member;
      await this.membershipFeeRepository.save(membershipFee);
      await this.emmitter.emitAsync('membership.member-created', { memberId: event.id });
      /*
      if (event.notify && card) {
        const command = new AssignCardNumberCommand(
          MemberId.fromString(member.memberId),
          MemberCard.create(card.prefix, card.nextCard),
        );
        await this.commandBus.execute(command);
        card.nextCard++;
        this.memberCardRepository.save(card);
      } else*/
    } catch (error) {
      console.error(error);
    }
  }
}
