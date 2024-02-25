import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberSuspensionEnded } from '../../../domain/events';
import { MemberStatus } from '../../../domain/model/member-status';
import { MemberView } from '../model/member.entity';

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
