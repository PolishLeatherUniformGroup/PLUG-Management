import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberView } from '../model/member.entity';
import { Repository } from 'typeorm';
import { MemberCardAssigned } from '../../../domain/events';
import { IViewUpdater } from '../../../../eventstore/view/interfaces/view-updater';
import { TypedEventEmitter } from '../../../../event-emitter/typed-event-emmitter';

@EventsHandler(MemberCardAssigned)
export class MemberCardAssignedProjection
  implements IViewUpdater<MemberCardAssigned>
{
  constructor(
    @InjectRepository(MemberView)
    private readonly memberRepository: Repository<MemberView>,
    private readonly emitter: TypedEventEmitter
  ) {}
  async handle(event: MemberCardAssigned) {
    const member = await this.memberRepository.findOne({
      where: { memberId: event.id },
    });
    if (!member) {
      throw new Error('Member not found');
    }
    member.cardNumber = event.cardNumber.toString();
    await this.memberRepository.save(member);
    await this.emitter.emitAsync('membership.member-joined', {
      name: member.firstName,
      email: member.email,
      cardNumber: member.cardNumber,
    });
  }
}
