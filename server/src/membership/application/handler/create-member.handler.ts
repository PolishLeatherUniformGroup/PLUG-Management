import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMemberCommand } from '../command/create-member.command';
import { Member } from '../../domain/model/member';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { MemberAggregateRepository } from '../../infrastructure/repository/member-aggregate-repository';

@CommandHandler(CreateMemberCommand)
export class CreateMemberHandler
  implements ICommandHandler<CreateMemberCommand>
{
  constructor(
    private readonly members: MemberAggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: CreateMemberCommand): Promise<void> {
    try {
      const member = Member.create(
        command.memberId,
        command.firstName,
        command.lastName,
        command.email,
        command.phoneNumber,
        command.joinDate,
        command.birthDate,
        command.address,
        command.initialFee,
      );
      this.publisher.mergeObjectContext(member);
      member.commit();
    } catch (error) {
      console.trace(error);
    }
  }
}
