import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberView } from '../model/member.entity';
import { MemberExpelled } from 'src/membership/domain/events';
import { MemberExpulsionView } from '../model/member-expulsion.entity';

@EventsHandler(MemberExpelled)
export class MemberExpelledProjection implements IEventHandler<MemberExpelled> {
  constructor(
    @InjectRepository(MemberView)
    private memberViewRepository: Repository<MemberView>,
    @InjectRepository(MemberExpulsionView)
    private memberExpulsionViewRepository: Repository<MemberExpulsionView>,
  ) {}
  async handle(event: MemberExpelled) {
    const member = await this.memberViewRepository.findOne({
      where: { id: event.id },
    });
    if (!member) {
      throw new Error('Member not found');
    }
    const memberExpulsionView = new MemberExpulsionView();
    memberExpulsionView.id = event.id;
    memberExpulsionView.expulsionDate = event.date;
    memberExpulsionView.reason = event.reason;
    memberExpulsionView.appealDeadline = event.appealDeadline;
    memberExpulsionView.member = member;
    await this.memberExpulsionViewRepository.save(memberExpulsionView);
  }
}
