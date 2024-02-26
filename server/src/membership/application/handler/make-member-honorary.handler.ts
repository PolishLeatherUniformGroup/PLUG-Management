import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MEMBERS, Members } from '../../domain/repository/members';
import { Inject } from '@nestjs/common';
import { MakeMemberHonoraryCommand } from '../command/make-member-honorary.command';
import { AggregateRepository } from '../../../eventstore/aggregate-repository';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Member } from '../../domain/model/member';

@CommandHandler(MakeMemberHonoraryCommand)
export class MakeMemberHonoraryHandler
  implements ICommandHandler<MakeMemberHonoraryCommand>
{
  constructor(private readonly members:AggregateRepository, private readonly publisher:StoreEventPublisher) {}

  async execute(command: MakeMemberHonoraryCommand): Promise<any> {
    const member =this.publisher.mergeObjectContext( await this.members.getById(Member,command.id.value));
    if (!member) {
      throw new Error('Member not found');
    }
    member.makeRegularMember();
    member.commit();
  }
}
