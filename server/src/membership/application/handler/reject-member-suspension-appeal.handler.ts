import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RejectMemberSuspensionAppealCommand } from '../command/reject-member-suspension-appeal.command';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Member } from '../../domain/model/member';
import { MemberAggregateRepository } from '../../infrastructure/repository/member-aggregate-repository';

@CommandHandler(RejectMemberSuspensionAppealCommand)
export class RejectMemberSuspensionAppealHandler
  implements ICommandHandler<RejectMemberSuspensionAppealCommand>
{
  constructor(
    private readonly members: MemberAggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: RejectMemberSuspensionAppealCommand) {
    const member = this.publisher.mergeObjectContext(
      await this.members.getById(Member, command.memberId.value),
    );
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
