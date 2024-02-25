import { InjectRepository } from '@nestjs/typeorm';
import { MemberView } from '../../read-model/model/member.entity';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { GetMembersQuery } from '../get-members.query';

@QueryHandler(GetMembersQuery)
export class GetMembersHandler
  implements IQueryHandler<GetMembersQuery, MemberView[]>
{
  constructor(
    @InjectRepository(MemberView)
    private readonly memberRepository: Repository<MemberView>,
  ) {}

  async execute(query: GetMembersQuery): Promise<MemberView[]> {
    const members = await this.memberRepository.find({
      order: { cardNumber: 'ASC' },
    });
    return members;
  }
}
