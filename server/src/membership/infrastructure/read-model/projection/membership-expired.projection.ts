import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipExpired } from '../../../domain/events';
import { MemberStatus } from '../../../domain/model/member-status';
import { MemberView } from '../model/member.entity';

@EventsHandler(MembershipExpired)
export class MembershipExpiredProjection
  implements IEventHandler<MembershipExpired>
{
  constructor(
    @InjectRepository(MemberView)
    private readonly memberRepository: Repository<MemberView>,
  ) {}

  async handle(event: MembershipExpired) {
    const member = await this.memberRepository.findOne({
      where: { memberId: event.id },
    });
    if (member) {
      member.status = MemberStatus.Expired;
      member.expireDate = event.date;
      await this.memberRepository.save(member);
    }
  }
}
