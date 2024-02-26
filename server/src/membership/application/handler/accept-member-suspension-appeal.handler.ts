import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AcceptMemberSuspensionAppealCommand } from '../command/accept-member-suspension-appeal.command';
import { Inject } from '@nestjs/common';
import { MEMBERS, Members } from '../../domain/repository/members';
import { AggregateRepository } from '../../../eventstore/aggregate-repository';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Member } from '../../domain/model/member';

@CommandHandler(AcceptMemberSuspensionAppealCommand)
export class AcceptMemberSuspensionAppealHandler
  implements ICommandHandler<AcceptMemberSuspensionAppealCommand>
{
  constructor(private readonly members:AggregateRepository, private readonly publisher:StoreEventPublisher) {}

  async execute(command: AcceptMemberSuspensionAppealCommand) {
    const member = this.publisher.mergeObjectContext(await this.members.getById(Member,command.memberId.value));;
    if (!member) {
      throw new Error('Member not found');
    }
    member.acceptSuspensionAppeal(
      command.suspensionId,
      command.date,
      command.reason,
    );
    member.commit();
  }
}
