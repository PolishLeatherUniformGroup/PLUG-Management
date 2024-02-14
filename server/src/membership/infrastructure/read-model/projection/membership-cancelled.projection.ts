import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MembershipCancelled } from 'src/membership/domain/events/membership-cancelled.event';
import { MemberView } from '../model/member.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberStatus } from 'src/membership/domain/model/member-status';

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
