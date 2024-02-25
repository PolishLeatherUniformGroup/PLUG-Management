import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberExpulsionAppealed } from '../../../domain/events';
import { MemberExpulsionView } from '../model/member-expulsion.entity';


@EventsHandler(MemberExpulsionAppealed)
export class MemberExpulsionAppealedProjection
  implements IEventHandler<MemberExpulsionAppealed>
{
  constructor(
    @InjectRepository(MemberExpulsionView)
    private readonly memberExpulsionRepository: Repository<MemberExpulsionView>,
  ) {}

  async handle(event: MemberExpulsionAppealed) {
    const expulsion = await this.memberExpulsionRepository.findOne({
      where: { id: event.expulsionId },
    });
    if (expulsion) {
      expulsion.appealDate = event.date;
      expulsion.appealJustification = event.justification;
      await this.memberExpulsionRepository.save(expulsion);
    }
  }
}
