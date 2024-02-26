import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterMembershipFeePaymentCommand } from '../command/register-membership-fee-payment.command';
import { Member } from '../../domain/model/member';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { MemberAggregateRepository } from '../../infrastructure/repository/member-aggregate-repository';

@CommandHandler(RegisterMembershipFeePaymentCommand)
export class RegisterMembershipFeePaymentHandler
  implements ICommandHandler<RegisterMembershipFeePaymentCommand>
{
  constructor(private readonly members:MemberAggregateRepository, private readonly publisher:StoreEventPublisher) {}

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
