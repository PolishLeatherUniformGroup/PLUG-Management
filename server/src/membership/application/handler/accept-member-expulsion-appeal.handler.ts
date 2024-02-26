import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AcceptMemberExpulsionAppealCommand } from '../command/accept-member-expulsion-appeal.command';
import { Member } from '../../domain/model/member';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { MemberAggregateRepository } from '../../infrastructure/repository/member-aggregate-repository';

@CommandHandler(AcceptMemberExpulsionAppealCommand)
export class AcceptMemberExpulsionAppealHandler
  implements ICommandHandler<AcceptMemberExpulsionAppealCommand>
{
  constructor(private readonly members:MemberAggregateRepository, 
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
