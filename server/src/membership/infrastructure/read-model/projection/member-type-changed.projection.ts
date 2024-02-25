import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberTypeChanged } from '../../../domain/events';
import { MemberView } from '../model/member.entity';

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
