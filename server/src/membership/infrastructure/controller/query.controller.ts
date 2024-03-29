import {
  Controller,
  UseGuards,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { JwtGuard } from '../../../auth/jwt.guard';
import { AddressDto } from '../../../shared/dto/address.dto';
import { MoneyDto } from '../../../shared/dto/money.dto';
import { MemberDto } from '../dto/member.dto';
import { MembersDto } from '../dto/members.dto';
import { MembershipFeeDto } from '../dto/membership-fee.dto';
import { MembershipFeesDto } from '../dto/membership-fees.dto';
import { GetMemberFeesQuery } from '../query/get-member-fees.query';
import { GetMemberQuery } from '../query/get-member.query';
import { GetMembersQuery } from '../query/get-members.query';
import { MemberView } from '../read-model/model/member.entity';
import { MembershipFeeView } from '../read-model/model/membership-fee.entity';

@Controller('membership')
@ApiTags('membership')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class QueryController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('members')
  @ApiOperation({ summary: 'Gets all members' })
  @ApiResponse({ status: 200, description: 'Members collection' })
  async getMembers(): Promise<MembersDto> {
    const query = new GetMembersQuery();
    const queryresult: MemberView[] = await this.queryBus.execute(query);
    return {
      data: queryresult.map((member) => {
        return {
          id: member.memberId,
          card: member.cardNumber,
          firstName: member.firstName,
          lastName: member.lastName,
          email: member.email,
          phoneNumber: member.phoneNumber,
          address: {
            country: member.addressCountry,
            city: member.addressCity,
            street: member.addressStreet,
            postalCode: member.addressPostalCode,
            state: member.addressState,
          } as AddressDto,
          status: member.status,
          joinedDate: member.joinDate,
          birthDate: member.birthDate,
          type: member.memberType,
        } as MemberDto;
      }),
    } as MembersDto;
  }

  @Get('members/:cardOrId')
  @ApiOperation({ summary: 'Gets member' })
  @ApiResponse({ status: 200, description: 'Member' })
  @ApiParam({
    name: 'cardOrId',
    required: true,
    description: 'Member id or card number',
    type: 'string',
  })
  async getMember(@Param() cardOrId: string): Promise<MemberDto | null> {
    const query = new GetMemberQuery(cardOrId['cardOrId']);
    const member: MemberView | null = await this.queryBus.execute(query);
    if (member == null || member === undefined) {
      throw new NotFoundException();
    }
    return {
      id: member.memberId,
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      phoneNumber: member.phoneNumber,
      birthDate: member.birthDate,
      joinedDate: member.joinDate,
      status: member.status,
      address: {
        country: member.addressCountry,
        city: member.addressCity,
        street: member.addressStreet,
        postalCode: member.addressPostalCode,
        state: member.addressState,
      } as AddressDto,
      card: member.cardNumber,
    } as MemberDto;
  }

  @Get('members/:id/fees')
  @ApiOperation({ summary: 'Gets member fees' })
  @ApiResponse({ status: 200, description: 'Member fees' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Member id',
    type: 'string',
  })
  async getMemberFees(@Param() id: string): Promise<MembershipFeesDto> {
    const query = new GetMemberFeesQuery(id);
    const fees: MembershipFeeView[] = await this.queryBus.execute(query);

    return {
      data: fees.map((fee) => {
        return {
          ...fee,
          dueAmount: {
            amount: fee.dueAmount,
            currency: fee.currency,
          } as MoneyDto,
          paidAmount:
            fee.paidAmount &&
            ({
              amount: fee.paidAmount,
              currency: fee.currency,
            } as MoneyDto),
        } as MembershipFeeDto;
      }),
    };
  }
}
