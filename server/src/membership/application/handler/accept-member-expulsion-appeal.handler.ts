import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AcceptMemberExpulsionAppealCommand } from '../command/accept-member-expulsion-appeal.command';
import { MEMBERS, Members } from '../../domain/repository/members';
import { AggregateRepository } from '../../../eventstore/aggregate-repository';
import { Member } from '../../domain/model/member';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';

@CommandHandler(AcceptMemberExpulsionAppealCommand)
export class AcceptMemberExpulsionAppealHandler
  implements ICommandHandler<AcceptMemberExpulsionAppealCommand>
{
  constructor(private readonly members:AggregateRepository, 
    private readonly publisher:StoreEventPublisher) {}

  async execute(command: AcceptMemberExpulsionAppealCommand) {
    const member = this.publisher.mergeObjectContext(await this.members.getById(Member,command.memberId.value));;
    if (!member) {
      throw new Error('Member not found');
    }
    member.acceptExpulsionAppeal(
      command.expulsionId,
      command.date,
      command.reason,
    );
    member.commit();
  }
}
