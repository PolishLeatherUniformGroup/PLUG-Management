import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMemberCommand } from '../command/create-member.command';
import { MEMBERS, Members } from '../..//domain/repository/members';
import { Inject } from '@nestjs/common';
import { Member } from '../../domain/model/member';
import { AggregateRepository } from '../../../eventstore/aggregate-repository';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';

@CommandHandler(CreateMemberCommand)
export class CreateMemberHandler
  implements ICommandHandler<CreateMemberCommand>
{
  constructor(private readonly members:AggregateRepository, private readonly publisher:StoreEventPublisher) {}

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
