import { Body, Controller, Post } from "@nestjs/common";
import { ApplyRequestDto } from "../dto/apply-request.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommandBus } from "@nestjs/cqrs";
import { SendApplicationCommand } from "src/apply/application/command/send-application.command";
import { Address } from "src/shared/address";
import { RequestRecommendations as RequestRecommendationsCommand } from "src/apply/application/command/request-recommendations.command";
import { ApplicantId } from "src/apply/domain/model";
import { Money } from "src/shared/money";
import { RequestRecommendationsDto } from "../dto/request-recommendations.dto";
import { CancelRequestDto } from "../dto/cancel-request.dto";
import { CancelApplicationCommand } from "src/apply/application/command/cancel-application.command";

@Controller('apply')
@ApiTags('apply')
export class ApplyController {

    constructor(private readonly commandBus: CommandBus) { }

    @Post('command/send-application')
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

    @Post('command/request-recommendations')
    @ApiOperation({ summary: 'Request recommendations' })
    @ApiResponse({ status: 204, description: 'Recommendations requested.' })
    async requestRecommendations(@Body() payload: RequestRecommendationsDto) {
        try {
            const command: RequestRecommendationsCommand = new RequestRecommendationsCommand(
                ApplicantId.fromString(payload.applicantId),
                payload.requestDate,
                Money.create(payload.requiredFee.amount, payload.requiredFee.currency));
            await this.commandBus.execute(command);
        } catch (error) {
            console.error(error);
        }
    }

    @Post('command/cancel-application')
    @ApiOperation({ summary: 'Cancel application' })
    @ApiResponse({ status: 204, description: 'Application cancelled.' })
    async cancelApplication(@Body() payload: CancelRequestDto) {
        try {
            const command: CancelApplicationCommand = new CancelApplicationCommand(
                ApplicantId.fromString(payload.applicantId));
            await this.commandBus.execute(command);
        } catch (error) {
            console.error(error);
        }
    }

}