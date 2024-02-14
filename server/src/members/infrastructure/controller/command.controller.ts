import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateMemberRequestDto } from "../dto/create-member-request.dto";
import { CreateMemberCommand } from "src/members/application/command/create-member.command";
import { Member } from "src/members/domain/model/member";
import { MemberId } from "src/members/domain/model/member-id";
import { randomUUID } from "crypto";
import { Address } from "src/shared/address";
import { MembershipFee } from "src/members/domain/model/membership-fee";
import { MoneyDto } from "src/shared/dto/money.dto";
import { Money } from "src/shared/money";

@Controller('membership/commands')
@ApiTags('membership')
export class CommandController {
    constructor(
        private readonly commandBus: CommandBus,
    ) { }

    @Post('create-member')
    @ApiOperation({ summary: 'Manula member creation' })
    @ApiResponse({ status: 204, description: 'Member created.' })
    async createMember(@Body() payload: CreateMemberRequestDto) {
        try {
            const newId = MemberId.fromUUID(randomUUID());
            const command: CreateMemberCommand = new CreateMemberCommand(
                newId,
                payload.firstName,
                payload.lastName,
                payload.email,
                payload.phoneNumber,
                payload.joinDate,
                payload.birthDate,
                Address.fromDto(payload.address),
                MembershipFee.initialFeeForMember(
                    newId,
                    Money.create(payload.initialFee.dueAmount.amount, payload.initialFee.dueAmount.currency),
                    Money.create(payload.initialFee.paidAmount?.amount ?? 0, payload.initialFee.paidAmount?.currency ?? 'PLN'),
                    payload.initialFee.paidDate ?? new Date()
                )
            );

            await this.commandBus.execute(command);
        } catch (error) {
            console.error(error);
        }

    }
}