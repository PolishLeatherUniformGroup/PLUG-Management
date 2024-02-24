import { Controller, Get, HttpStatus, NotFoundException, Param, Res, } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from "@nestjs/swagger";
import { MembersDto } from "../dto/members.dto";
import { GetMembersQuery } from "../query/get-members.query";
import { GetMemberQuery } from "../query/get-member.query";
import { MemberDto } from "../dto/member.dto";
import { MemberView } from "../read-model/model/member.entity";
import { AddressDto } from "src/shared/dto/address.dto";
import { MembershipFeesDto } from "../dto/membership-fees.dto";
import { GetMemberFeesQuery } from "../query/get-member-fees.query";
import { MembershipFeeView } from "../read-model/model/membership-fee.entity";
import { MembershipFeeDto } from "../dto/membership-fee.dto";
import { MoneyDto } from "src/shared/dto/money.dto";


@Controller('membership')
@ApiTags('membership')
export class QueryController {
    constructor(
        private readonly queryBus: QueryBus
    ) { }

    @Get('members')
    @ApiOperation({ summary: 'Gets all members' })
    @ApiResponse({ status: 200, description: 'Members collection' })
    async getMembers(): Promise<MembersDto> {
        const query = new GetMembersQuery();
        const queryresult: MemberView[] = await this.queryBus.execute(query);
        return {
            data: queryresult.map((member) => {
                return {
                    id: member.id,
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
            })
        } as MembersDto;
    }

    @Get('members/:id')
    @ApiOperation({ summary: 'Gets member' })
    @ApiResponse({ status: 200, description: 'Member' })
    @ApiParam({ name: 'id', required: true, description: 'Member id' , type: 'string'})

    async getMember(@Param() id: string, @Res() res): Promise<MemberDto> {
        const query = new GetMemberQuery(id);
        const member: MemberView | null = await this.queryBus.execute(query);
        if (member == null || member === undefined) {
            throw new NotFoundException();
        }
        const memberDto = {
            ...member,
            address: {
                country: member.addressCountry,
                city: member.addressCity,
                street: member.addressStreet,
                postalCode: member.addressPostalCode,
                state: member.addressState,
            } as AddressDto,
            type: member.memberType,
            card: member.cardNumber,
        } as MemberDto;
        return memberDto;

    }

    @Get('members/:id/fees')
    @ApiOperation({ summary: 'Gets member fees' })
    @ApiResponse({ status: 200, description: 'Member fees' })
    @ApiParam({ name: 'id', required: true, description: 'Member id', type: 'string'})

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
                    paidAmount: fee.paidAmount &&{
                        amount: fee.paidAmount,
                        currency: fee.currency,
                    } as MoneyDto,                    
                } as MembershipFeeDto
            })
        }
    }

}