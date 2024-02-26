import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Member } from '../../domain/model/member';
import { AddMemberCommand } from '../command/add-member.command';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { MemberAggregateRepository } from '../../infrastructure/repository/member-aggregate-repository';

@CommandHandler(AddMemberCommand)
export class AddMemberHandler implements ICommandHandler<AddMemberCommand> {
  constructor(private readonly members:MemberAggregateRepository, private readonly publisher:StoreEventPublisher) {}

  async execute(command: AddMemberCommand): Promise<void> {
    try {
      const member = Member.add(
        command.memberId,
        command.card,
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
