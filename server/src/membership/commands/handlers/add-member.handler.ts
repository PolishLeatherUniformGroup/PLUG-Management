import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { MemberRepository } from 'src/membership/repository/member.repository';
import { AddMemberCommand } from '../impl/add-member.command';
import { Member } from 'src/membership/model/member.model';
import { randomUUID } from 'crypto';

@CommandHandler(AddMemberCommand)
export class AddMemberHandler implements ICommandHandler<AddMemberCommand> {
  constructor(
    private readonly repository: MemberRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: AddMemberCommand) {
    const member = this.eventPublisher.mergeObjectContext(
      new Member(
        randomUUID(),
        command.firstName,
        command.lastName,
        command.email,
        command.phoneNumber,
        command.birthDate,
        command.address,
        command.joinDate,
        command.paidFeeAmount,
        command.paidFeeDate,
      ),
    );

    this.repository.save(member);
    member.commit();
  }
}
