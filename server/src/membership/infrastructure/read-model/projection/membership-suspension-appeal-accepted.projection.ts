import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipSuspensionAppealAccepted } from '../../../domain/events';
import { MemberStatus } from '../../../domain/model/member-status';
import { MemberSuspensionView } from '../model/member-suspension.entity';
import { MemberView } from '../model/member.entity';

@EventsHandler(MembershipSuspensionAppealAccepted)
export class MembershipSuspensionAppealAcceptedProjection
  implements IEventHandler<MembershipSuspensionAppealAccepted>
{
  constructor(
    @InjectRepository(MemberView)
    private readonly memberRepository: Repository<MemberView>,
    @InjectRepository(MemberSuspensionView)
    private readonly memberSuspensionRepository: Repository<MemberSuspensionView>,
  ) {}

  async handle(event: MembershipSuspensionAppealAccepted) {
    const member = await this.memberRepository.findOne({
      where: { memberId: event.id },
    });
    if (member) {
      const suspension = await this.memberSuspensionRepository.findOne({
        where: { id: event.suspensionId },
      });
      if (suspension) {
        suspension.appealSuccessful = true;
        suspension.appealDecision = event.reason;
        suspension.appealDecisionDate = event.date;
        await this.memberSuspensionRepository.save(suspension);
      }
      member.status = MemberStatus.Active;
      await this.memberRepository.save(member);
    }
  }
}
