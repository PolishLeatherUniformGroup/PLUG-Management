import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { RequestRecommendations as RequestRecommendationsCommand } from 'src/apply/application/command/request-recommendations.command';
import { ApplicantId } from 'src/apply/domain/model';
import { Money } from 'src/shared/money';
import { RequestRecommendationsDto } from '../dto/request-recommendations.dto';
import { CancelRequestDto } from '../dto/cancel-request.dto';
import { CancelApplicationCommand } from 'src/apply/application/command/cancel-application.command';
import { RegisterFeePaymentRequestDto } from '../dto/register-fee-payment-request.dto';
import { RegisterFeePaymentCommand } from 'src/apply/application/command/register-fee-payment.command';
import { ConfirmRecommendationRequestDto } from '../dto/confirm-recommendation-request.dto';
import { ConfirmRecommendationCommand } from 'src/apply/application/command/confirm-recommendation.command';
import { RefuseRecommendationCommand } from 'src/apply/application/command/refuse-recommendation.command';
import { RefuseRecommendationRequestDto } from '../dto/refuse-recommendatiom-request.dto';
import { AcceptApplicationRequestDto } from '../dto/accept-application-request.dto';
import { AcceptApplicationCommand } from 'src/apply/application/command/accept-application.command';
import { RejectApplicationRequestDto } from '../dto/reject-application-request.dto';
import { RejectApplicationCommand } from 'src/apply/application/command/reject-application.command';
import { AppealApplicationRejectionRequestDto } from '../dto/appeal-application-rejection-request.dto';
import { AppealApplicationRejectionCommand } from 'src/apply/application/command/appeal-application-rejection.command';
import { AcceptApplicationRejectionAppealCommand } from 'src/apply/application/command/accept-application-rejection-appeal.command';
import { RejectApplicationRejectionAppealCommand } from 'src/apply/application/command/reject-application-rejection-appeal.command';
import { AcceptApplicationRejectionAppealRequestDto } from '../dto/accept-application-rejection-appeal-request.dto';
import { RejectApplicationRejectionAppealRequestDto } from '../dto/reject-application-rejection-appeal-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('apply')
@ApiTags('apply')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class CommandController {
  constructor(private readonly commandBus: CommandBus) { }


  @Post('commands/cancel-application')
  @ApiOperation({ summary: 'Cancel application' })
  @ApiResponse({ status: 204, description: 'Application cancelled.' })
  async cancelApplication(@Body() payload: CancelRequestDto) {
    try {
      const command: CancelApplicationCommand = new CancelApplicationCommand(
        ApplicantId.fromString(payload.applicantId),
      );
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
        Money.create(payload.fee.amount, payload.fee.currency),
      );
      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('commands/confirm-recommendation')
  @ApiOperation({ summary: 'Confirm recommendation of applicant.' })
  @ApiResponse({ status: 204, description: 'Recommendation confirmed.' })
  async confirmRecommendation(
    @Body() payload: ConfirmRecommendationRequestDto,
  ) {
    try {
      const command: ConfirmRecommendationCommand =
        new ConfirmRecommendationCommand(
          ApplicantId.fromString(payload.id),
          payload.recommendationId,
        );
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
      const command: RefuseRecommendationCommand =
        new RefuseRecommendationCommand(
          ApplicantId.fromString(payload.id),
          payload.recommendationId,
        );
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
        payload.decisionDate,
      );
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
        payload.decisionDate,
      );
      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('commands/appeal-rejection')
  @ApiOperation({ summary: 'Appeal application rejection.' })
  @ApiResponse({ status: 204, description: 'Application rejection appealed.' })
  async appealApplicationRejection(
    @Body() payload: AppealApplicationRejectionRequestDto,
  ) {
    try {
      const command: AppealApplicationRejectionCommand =
        new AppealApplicationRejectionCommand(
          ApplicantId.fromString(payload.id),
          payload.justification,
          payload.appealDate,
        );
      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('commands/accept-rejection-appeal')
  @ApiOperation({ summary: 'Accept application rejection appeal.' })
  @ApiResponse({
    status: 204,
    description: 'Application  rejection appeal accepted',
  })
  async acceptApplicationRejectionAppeal(
    @Body() payload: AcceptApplicationRejectionAppealRequestDto,
  ) {
    try {
      const command: AcceptApplicationRejectionAppealCommand =
        new AcceptApplicationRejectionAppealCommand(
          ApplicantId.fromString(payload.id),
          payload.decision,
          payload.decisionDate,
        );
      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('commands/reject-rejection-appeal')
  @ApiOperation({ summary: 'Reject application rejection appeal.' })
  @ApiResponse({
    status: 204,
    description: 'Application rejection appeal rejected',
  })
  async rejectApplicationRejectionAppeal(
    @Body() payload: RejectApplicationRejectionAppealRequestDto,
  ) {
    try {
      const command: RejectApplicationRejectionAppealCommand =
        new RejectApplicationRejectionAppealCommand(
          ApplicantId.fromString(payload.id),
          payload.decision,
          payload.decisionDate,
        );
      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
    }
  }
}
