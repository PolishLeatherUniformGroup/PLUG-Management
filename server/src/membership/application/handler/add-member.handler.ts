import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Member } from '../../domain/model/member';
import { MEMBERS, Members } from '../../domain/repository/members';
import { AddMemberCommand } from '../command/add-member.command';
import { AggregateRepository } from '../../../eventstore/aggregate-repository';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';

@CommandHandler(AddMemberCommand)
export class AddMemberHandler implements ICommandHandler<AddMemberCommand> {
  constructor(private readonly members:AggregateRepository, private readonly publisher:StoreEventPublisher) {}

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
      member.commit();
    } catch (error) {
      console.trace(error);
    }
  }
}
