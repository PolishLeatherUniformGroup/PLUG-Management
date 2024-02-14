import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MemberView } from '../model/member.entity';
import { MemberTypeChanged } from 'src/membership/domain/events/member-type-changed.event';

@EventsHandler(MemberTypeChanged)
export class MemberTypeChangedProjection
  implements IEventHandler<MemberTypeChanged>
{
  constructor(
    @InjectRepository(MemberView)
    private memberRepository: Repository<MemberView>,
  ) {}
  async handle(event: MemberTypeChanged) {
    try {
      const member = await this.memberRepository.findOne({
        where: { id: event.id },
      });
      if (member) {
        member.memberType = event.type;
        await this.memberRepository.save(member);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
