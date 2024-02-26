import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberSuspended } from '../../../domain/events';
import { MemberSuspensionView } from '../model/member-suspension.entity';
import { MemberView } from '../model/member.entity';

@EventsHandler(MemberSuspended)
export class MemberSuspendedProjection
  implements IEventHandler<MemberSuspended>
{
  constructor(
    @InjectRepository(MemberView)
    private memberViewRepository: Repository<MemberView>,
    @InjectRepository(MemberSuspensionView)
    private memberSuspensionViewRepository: Repository<MemberSuspensionView>,
  ) {}
  async handle(event: MemberSuspended) {
    const member = await this.memberViewRepository.findOne({
      where: { id: event.id },
    });
    if (!member) {
      throw new Error('Member not found');
    }
    const memberSuspensionView = new MemberSuspensionView();
    memberSuspensionView.id = event.id;
    memberSuspensionView.suspensionDate = event.date;
    memberSuspensionView.reason = event.reason;
    memberSuspensionView.suspensionEndDate = event.suspensionEndDate;
    memberSuspensionView.appealDeadline = event.appealDeadline;
    memberSuspensionView.member = member;
    await this.memberSuspensionViewRepository.save(memberSuspensionView);
  }
}
