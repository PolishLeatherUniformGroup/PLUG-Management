import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RejectMemberExpulsionAppealCommand } from '../command/reject-member-expulsion-appeal.command';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Member } from '../../domain/model/member';
import { MemberAggregateRepository } from '../../infrastructure/repository/member-aggregate-repository';

@CommandHandler(RejectMemberExpulsionAppealCommand)
export class RejectMemberExpulsionAppealHandler
  implements ICommandHandler<RejectMemberExpulsionAppealCommand>
{
  constructor(
    private readonly members: MemberAggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: RejectMemberExpulsionAppealCommand) {
    const member = this.publisher.mergeObjectContext(
      await this.members.getById(Member, command.memberId.value),
    );
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
