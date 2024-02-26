import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MEMBERS, Members } from '../../domain/repository/members';
import { AssignCardNumberCommand } from '../command/assign-card-number.command';
import { AggregateRepository } from '../../../eventstore/aggregate-repository';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Member } from '../../domain/model/member';

@CommandHandler(AssignCardNumberCommand)
export class AssignCardNumberHandler
  implements ICommandHandler<AssignCardNumberCommand>
{
  constructor(private readonly members:AggregateRepository, private readonly publisher:StoreEventPublisher) {}

  async execute(command: AssignCardNumberCommand) {
    const member = await this.members.getById(Member,command.id.value);
    if (!member) {
      throw new Error('Member not found');
    }
    member.assignCardNumber(command.card);
    await member.commit();
  }
}
