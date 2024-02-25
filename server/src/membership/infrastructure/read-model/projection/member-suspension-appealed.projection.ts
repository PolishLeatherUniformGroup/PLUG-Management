import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipSuspensionAppealed } from '../../../domain/events';
import { MemberSuspensionView } from '../model/member-suspension.entity';

@EventsHandler(MembershipSuspensionAppealed)
export class MemberSuspensionAppealedProjection
  implements IEventHandler<MembershipSuspensionAppealed>
{
  constructor(
    @InjectRepository(MemberSuspensionView)
    private readonly memberSuspensionRepository: Repository<MemberSuspensionView>,
  ) {}

  async handle(event: MembershipSuspensionAppealed) {
    const suspension = await this.memberSuspensionRepository.findOne({
      where: { id: event.suspensionId },
    });
    if (suspension) {
      suspension.appealDate = event.date;
      suspension.appealJustification = event.justification;
      await this.memberSuspensionRepository.save(suspension);
    }
  }
}
