import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberExpulsionAppealRejected } from '../../../domain/events';
import { MemberStatus } from '../../../domain/model/member-status';
import { MemberExpulsionView } from '../model/member-expulsion.entity';
import { MemberView } from '../model/member.entity';

@EventsHandler(MemberExpulsionAppealRejected)
export class MemberExpulsionAppealRejectedProjection
  implements IEventHandler<MemberExpulsionAppealRejected>
{
  constructor(
    @InjectRepository(MemberView)
    private memberViewRepository: Repository<MemberView>,
    @InjectRepository(MemberExpulsionView)
    private readonly memberExpulsionRepository: Repository<MemberExpulsionView>,
  ) {}

  async handle(event: MemberExpulsionAppealRejected) {
    const member = await this.memberViewRepository.findOne({
      where: { memberId: event.id },
    });
    if (member) {
      const expulsion = await this.memberExpulsionRepository.findOne({
        where: { id: event.expulsionId },
      });
      if (expulsion) {
        expulsion.appealSuccessful = false;
        expulsion.appealDecisionDate = event.date;
        expulsion.appealDecision = event.decision;
        await this.memberExpulsionRepository.save(expulsion);
      }
      member.status = MemberStatus.Deleted;
      await this.memberViewRepository.save(member);
    }
  }
}
