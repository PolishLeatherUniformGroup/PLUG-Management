import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterMembershipFeePaymentCommand } from '../command/register-membership-fee-payment.command';
import { Inject } from '@nestjs/common';
import { MEMBERS, Members } from '../../domain/repository/members';
import { Member } from '../../domain/model/member';
import { AggregateRepository } from '../../../eventstore/aggregate-repository';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';

@CommandHandler(RegisterMembershipFeePaymentCommand)
export class RegisterMembershipFeePaymentHandler
  implements ICommandHandler<RegisterMembershipFeePaymentCommand>
{
  constructor(private readonly members:AggregateRepository, private readonly publisher:StoreEventPublisher) {}

  async execute(command: RegisterMembershipFeePaymentCommand) {
    const member = this.publisher.mergeObjectContext(await this.members.getById(Member,command.memberId.value));;
    if (!member) {
      throw new Error('Member not found');
    }
    member.registerPaymentForMembershipFee(
      command.feeId,
      command.amount,
      command.paidDate,
    );
    await member.commit();
  }
}
