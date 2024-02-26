import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MEMBERS, Members } from '../../domain/repository/members';
import { Inject } from '@nestjs/common';
import { RejectMemberSuspensionAppealCommand } from '../command/reject-member-suspension-appeal.command';
import { AggregateRepository } from '../../../eventstore/aggregate-repository';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Member } from '../../domain/model/member';

@CommandHandler(RejectMemberSuspensionAppealCommand)
export class RejectMemberSuspensionAppealHandler
  implements ICommandHandler<RejectMemberSuspensionAppealCommand>
{
  constructor(private readonly members:AggregateRepository, private readonly publisher:StoreEventPublisher) {}

  async execute(command: RejectMemberSuspensionAppealCommand) {
    const member = this.publisher.mergeObjectContext(await this.members.getById(Member,command.memberId.value));;
    if (!member) {
      throw new Error('Member not found');
    }
    member.rejectSuspensionAppeal(
      command.suspensionId,
      command.date,
      command.reason,
    );
    member.commit();
  }
}
