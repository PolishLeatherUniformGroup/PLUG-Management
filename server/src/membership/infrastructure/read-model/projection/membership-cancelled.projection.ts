import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipCancelled } from '../../../domain/events';
import { MemberStatus } from '../../../domain/model/member-status';
import { MemberView } from '../model/member.entity';

@EventsHandler(MembershipCancelled)
export class MembershipCancelledProjection
  implements IEventHandler<MembershipCancelled>
{
  constructor(
    @InjectRepository(MemberView)
    private readonly memberRepository: Repository<MemberView>,
  ) {}

  async handle(event: MembershipCancelled) {
    const member = await this.memberRepository.findOne({
      where: { id: event.id },
    });
    if (member) {
      member.status = MemberStatus.Cancelled;
      member.cancelDate = event.date;
      await this.memberRepository.save(member);
    }
  }
}
