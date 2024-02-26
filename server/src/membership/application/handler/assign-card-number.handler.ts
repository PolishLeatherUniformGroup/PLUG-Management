import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AssignCardNumberCommand } from '../command/assign-card-number.command';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Member } from '../../domain/model/member';
import { MemberAggregateRepository } from '../../infrastructure/repository/member-aggregate-repository';

@CommandHandler(AssignCardNumberCommand)
export class AssignCardNumberHandler
  implements ICommandHandler<AssignCardNumberCommand>
{
  constructor(private readonly members:MemberAggregateRepository, private readonly publisher:StoreEventPublisher) {}

  async execute(command: AssignCardNumberCommand) {
    const member = await this.members.getById(Member,command.id.value);
    if (!member) {
      throw new Error('Member not found');
    }
    member.assignCardNumber(command.card);
    await member.commit();
  }
}
