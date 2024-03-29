import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MakeMemberRegularCommand } from '../command/make-member-regular.command';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Member } from '../../domain/model/member';
import { MemberAggregateRepository } from '../../infrastructure/repository/member-aggregate-repository';

@CommandHandler(MakeMemberRegularCommand)
export class MakeMemberRegularHandler
  implements ICommandHandler<MakeMemberRegularCommand>
{
  constructor(
    private readonly members: MemberAggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: MakeMemberRegularCommand): Promise<any> {
    const member = this.publisher.mergeObjectContext(
      await this.members.getById(Member, command.id.value),
    );
    if (!member) {
      throw new Error('Member not found');
    }
    member.makeRegularMember();
    member.commit();
  }
}
