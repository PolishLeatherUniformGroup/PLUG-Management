import { IQueryHandler } from '@nestjs/cqrs';
import { GetActiveMembersQuery } from '../get-active-members.query';
import { MemberView } from '../../read-model/model/member.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberDto } from '../../dto/member.dto';
import { AddressDto } from 'src/shared/dto/address.dto';

export class GetActiveMembersHandler
  implements IQueryHandler<GetActiveMembersQuery>
{
  constructor(
    @InjectRepository(MemberView)
    private readonly memberViewRepository: Repository<MemberView>,
  ) {}

  public async execute(): Promise<MemberView[]> {
    const members = await this.memberViewRepository.find({
      where: { status: 1 },
      order: { cardNumber: 'ASC' },
    });
    return members;
  }
}
