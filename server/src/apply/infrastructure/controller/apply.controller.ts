import { Body, Controller, Post } from "@nestjs/common";
import { ApplyRequestDto } from "../dto/apply-request.dto";
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from "@nestjs/swagger";
import { CommandBus } from "@nestjs/cqrs";
import { SendApplicationCommand } from "src/apply/application/command/send-application.command";
import { Address } from "src/shared/address";

@Controller('apply')
@ApiTags('apply')
export class ApplyController {

    constructor(private readonly commandBus: CommandBus) { }

    @Post('commands/send-application')
    @ApiOperation({ summary: 'Send application' })
    @ApiResponse({ status: 204, description: 'Create Applicant.' })
    async sendApplication(@Body() payload: ApplyRequestDto) {
        try {
            const command: SendApplicationCommand =
                new SendApplicationCommand(
                    payload.firstName,
                    payload.lastName,
                    payload.email,
                    payload.phoneNumber,
                    payload.applyDate,
                    payload.birthDate,
                    Address.fromDto(payload.address),
                    payload.recommendersCards
                );
            await this.commandBus.execute(command);
        } catch (error) {
            console.error(error);
        }
    }

}