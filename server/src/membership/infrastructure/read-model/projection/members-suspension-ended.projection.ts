import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MemberSuspensionEnded } from 'src/membership/domain/events/member-suspension-ended.event';
import { MemberView } from '../model/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberStatus } from 'src/membership/domain/model/member-status';

@EventsHandler(MemberSuspensionEnded)
export class MemberSuspensionEndedProjection
  implements IEventHandler<MemberSuspensionEnded>
{
  constructor(
    @InjectRepository(MemberView)
    private memberViewRepository: Repository<MemberView>,
  ) {}

  async handle(event: MemberSuspensionEnded) {
    const member = await this.memberViewRepository.findOne({
      where: { id: event.id },
    });
    if (member) {
      member.status = MemberStatus.Active;
      await this.memberViewRepository.save(member);
    }
  }
}
