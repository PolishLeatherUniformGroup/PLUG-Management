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

  public async execute(): Promise<MemberDto[]> {
    const members = await this.memberViewRepository.find({
      where: { status: 1 },
    });
    return members.map((member) => {
      return {
        ...member,
        address: {
          city: member.addressCity,
          country: member.addressCountry,
          street: member.addressStreet,
          postalCode: member.addressPostalCode,
          state: member.addressState,
        } as AddressDto,
      } as MemberDto;
    });
  }
}
