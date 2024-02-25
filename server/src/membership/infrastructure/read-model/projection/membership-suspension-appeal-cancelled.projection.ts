import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipSuspensionAppealCancelled } from '../../../domain/events';
import { MemberSuspensionView } from '../model/member-suspension.entity';

@EventsHandler(MembershipSuspensionAppealCancelled)
export class MembershipSuspensionAppealCancelledProjection
  implements IEventHandler<MembershipSuspensionAppealCancelled>
{
  constructor(
    @InjectRepository(MemberSuspensionView)
    private readonly memberSuspensionRepository: Repository<MemberSuspensionView>,
  ) {}

  async handle(event: MembershipSuspensionAppealCancelled) {
    const suspension = await this.memberSuspensionRepository.findOne({
      where: { id: event.suspensionId },
    });
    if (suspension) {
      suspension.appealSuccessful = false;
      await this.memberSuspensionRepository.save(suspension);
    }
  }
}
