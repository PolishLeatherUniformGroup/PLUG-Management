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
import { RegisterFeePaymentRequestDto } from "../dto/register-fee-payment-request.dto";
import { RegisterFeePaymentCommand } from "src/apply/application/command/register-fee-payment.command";
import { ConfirmRecommendationRequestDto } from "../dto/confirm-recommendation-request.dto";
import { ConfirmRecommendationCommand } from "src/apply/application/command/confirm-recommendation.command";
import { RefuseRecommendationCommand } from "src/apply/application/command/refuse-recommendation.command";
import { RefuseRecommendationRequestDto } from "../dto/refuse-recommendatiom-request.dto";
import { AcceptApplicationRequestDto } from "../dto/accept-application-request.dto";
import { AcceptApplicationCommand } from "src/apply/application/command/accept-application.command";
import { RejectApplicationRequestDto } from "../dto/reject-application-request.dto";
import { RejectApplicationCommand } from "src/apply/application/command/reject-application.command";

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

    @Post('commands/request-recommendations')
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

    @Post('commands/cancel-application')
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

    @Post('commands/register-fee-payment')
    @ApiOperation({ summary: 'Register fee payment.' })
    @ApiResponse({ status: 204, description: 'Fee payment rgistered.' })
    async registerFeePayment(@Body() payload: RegisterFeePaymentRequestDto) {
        try {
            const command: RegisterFeePaymentCommand = new RegisterFeePaymentCommand(
                ApplicantId.fromString(payload.id),
                payload.paymentDate,
                Money.create(payload.fee.amount, payload.fee.currency));
            await this.commandBus.execute(command);
        } catch (error) {
            console.error(error);
        }
    }

    @Post('commands/confirm-recommendation')
    @ApiOperation({ summary: 'Confirm recommendation of applicant.' })
    @ApiResponse({ status: 204, description: 'Recommendation confirmed.' })
    async confirmRecommendation(@Body() payload: ConfirmRecommendationRequestDto) {
        try {
            const command: ConfirmRecommendationCommand = new ConfirmRecommendationCommand(
                ApplicantId.fromString(payload.id),
                payload.recommendationId);
            await this.commandBus.execute(command);
        } catch (error) {
            console.error(error);
        }
    }

    @Post('commands/refuse-recommendation')
    @ApiOperation({ summary: 'Refuse recommendation of applicant.' })
    @ApiResponse({ status: 204, description: 'Recommendation refused.' })
    async refuseRecommendation(@Body() payload: RefuseRecommendationRequestDto) {
        try {
            const command: RefuseRecommendationCommand = new RefuseRecommendationCommand(
                ApplicantId.fromString(payload.id),
                payload.recommendationId);
            await this.commandBus.execute(command);
        } catch (error) {
            console.error(error);
        }
    }

    
    @Post('commands/accept-application')
    @ApiOperation({ summary: 'Accept application.' })
    @ApiResponse({ status: 204, description: 'Application accepted' })
    async acceptApplication(@Body() payload: AcceptApplicationRequestDto) {
        try {
            const command: AcceptApplicationCommand = new AcceptApplicationCommand(
                ApplicantId.fromString(payload.id),
                payload.decision, 
                payload.decisionDate);
            await this.commandBus.execute(command);
        } catch (error) {
            console.error(error);
        }
    }

    
    @Post('commands/reject-application')
    @ApiOperation({ summary: 'Reject application.' })
    @ApiResponse({ status: 204, description: 'Application rejected' })
    async rejectApplication(@Body() payload: RejectApplicationRequestDto) {
        try {
            const command: RejectApplicationCommand = new RejectApplicationCommand(
                ApplicantId.fromString(payload.id),
                payload.decision, 
                payload.decisionDate);
            await this.commandBus.execute(command);
        } catch (error) {
            console.error(error);
        }
    }

}