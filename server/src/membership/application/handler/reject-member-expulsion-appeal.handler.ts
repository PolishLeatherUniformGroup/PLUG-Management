import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MEMBERS, Members } from '../../domain/repository/members';
import { Inject } from '@nestjs/common';
import { RejectMemberExpulsionAppealCommand } from '../command/reject-member-expulsion-appeal.command';
import { AggregateRepository } from '../../../eventstore/aggregate-repository';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Member } from '../../domain/model/member';

@CommandHandler(RejectMemberExpulsionAppealCommand)
export class RejectMemberExpulsionAppealHandler
  implements ICommandHandler<RejectMemberExpulsionAppealCommand>
{
  constructor(private readonly members:AggregateRepository, private readonly publisher:StoreEventPublisher) {}

  async execute(command: RejectMemberExpulsionAppealCommand) {
    const member = this.publisher.mergeObjectContext(await this.members.getById(Member,command.memberId.value));;
    if (!member) {
      throw new Error('Member not found');
    }
    member.rejectExpulsionAppeal(
      command.expulsionId,
      command.date,
      command.reason,
    );
    member.commit();
  }
}
