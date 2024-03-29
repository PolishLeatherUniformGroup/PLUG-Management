import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberExpulsionAppealCancelled } from '../../../domain/events';
import { MemberStatus } from '../../../domain/model/member-status';
import { MemberSuspensionView } from '../model/member-suspension.entity';
import { MemberView } from '../model/member.entity';
@EventsHandler(MemberExpulsionAppealCancelled)
export class MemberExpulsionAppealCancelledProjection
  implements IEventHandler<MemberExpulsionAppealCancelled>
{
  constructor(
    @InjectRepository(MemberView)
    private memberViewRepository: Repository<MemberView>,
    @InjectRepository(MemberSuspensionView)
    private readonly memberSuspensionRepository: Repository<MemberSuspensionView>,
  ) {}

  async handle(event: MemberExpulsionAppealCancelled) {
    const member = await this.memberViewRepository.findOne({
      where: { memberId: event.id },
    });
    if (member) {
      const expulsion = await this.memberSuspensionRepository.findOne({
        where: { id: event.expulsionId },
      });
      if (expulsion) {
        expulsion.appealSuccessful = false;
        await this.memberSuspensionRepository.save(expulsion);
      }
      member.status = MemberStatus.Deleted;
      await this.memberViewRepository.save(member);
    }
  }
}
