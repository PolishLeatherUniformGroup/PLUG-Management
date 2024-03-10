import { ICommandHandler } from '@nestjs/cqrs';
import { EndMemberSuspensionCommand } from '../command/end-member-suspension.command';
import { Member } from '../../domain/model/member';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { MemberAggregateRepository } from '../../infrastructure/repository/member-aggregate-repository';

export class EndMemberSuspensionHandler
  implements ICommandHandler<EndMemberSuspensionCommand>
{
  constructor(
    private readonly members: MemberAggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: EndMemberSuspensionCommand) {
    const member = this.publisher.mergeObjectContext(
      await this.members.getById(Member, command.memberId.value),
    );
    if (!member) {
      throw new Error('Member not found');
    }
    member.endSuspension();
    member.commit();
  }
}
