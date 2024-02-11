import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SendApplicationDto } from './dtos/send-application.dto';
import { SendApplicationCommand } from './commands/impl/send-application.command';
import { RequestRecommendationCommand } from './commands/impl/request-recommendation.command';

import { Money } from '../models/money.model';
import { RecommendationActionDto } from './dtos/recommendation-action.dto';
import { EndorseApplicantCommand } from './commands/impl/endorse-applicant.command';
import { OpposeApplicantCommand } from './commands/impl/oppose-applicant.command';
import { DismissApplicationDto } from './dtos/dismiss-application.dto';
import { DismissApplicationCommand } from './commands/impl/dismiss-application.command';
import { RegisterFeePaymnentDto } from './dtos/register-fee-payment.dto';
import { RegisterFeePaymentCommand } from './commands/impl/register-fee-payment.command';

import { RejectApplicantCommand } from './commands/impl/reject-applicant.command';
import { ApplicationDecisionDto } from './dtos/decision.dto';
import { RejectAppealCommand } from './commands/impl/reject-appeal.command';
import { AccceptApplicationDto } from './dtos/accept-application.dto';
import { ApproveAppealCommand } from './commands/impl/approve-appeal.command';
import { ApproveApplicantCommand } from './commands/impl/approve-applicant.command';

@Controller('apply')
@ApiTags('apply')
export class ApplyController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('send-application')
  @ApiOperation({ summary: 'Send New Application' })
  @ApiCreatedResponse({ description: 'Application was received' })
  async sendApplication(@Body() dto: SendApplicationDto) {
    const command: SendApplicationCommand = { ...dto };
    return this.commandBus.execute(command);
  }

  @Post('dismiss-application')
  @ApiOperation({ summary: 'Dismiss Application' })
  @ApiCreatedResponse({ description: 'Application was dismissed' })
  async sdismissApplication(@Body() dto: DismissApplicationDto) {
    const command: DismissApplicationCommand = { ...dto };
    return this.commandBus.execute(command);
  }

  @Post('accept-application')
  @ApiOperation({ summary: 'Accepts  Application as valid' })
  @ApiCreatedResponse({ description: 'Application was accepted' })
  async acceptApplication(@Body() dto: AccceptApplicationDto) {
    const command: RequestRecommendationCommand = {
      ...dto,
      date: new Date(Date.now()),
      requiredFee:
        dto.requiredFee &&
        new Money(dto.requiredFee?.amount, dto.requiredFee?.currency),
    };
    return this.commandBus.execute(command);
  }

  @Post('endorse-applicant')
  @ApiOperation({ summary: 'Accepts  Application as valid' })
  @ApiCreatedResponse({
    description: 'Application was endorsed by recommender',
  })
  async endorseApplicant(@Body() dto: RecommendationActionDto) {
    const command: EndorseApplicantCommand = { ...dto };
    return this.commandBus.execute(command);
  }

  @Post('oppose-applicant')
  @ApiOperation({ summary: 'Accepts  Application as valid' })
  @ApiCreatedResponse({ description: 'Application was opposed by recommender' })
  async opposeApplicant(@Body() dto: RecommendationActionDto) {
    const command: OpposeApplicantCommand = { ...dto };
    return this.commandBus.execute(command);
  }

  @Post('register-fee-payment')
  @ApiOperation({ summary: 'Accepts  Fee Payment' })
  @ApiCreatedResponse({ description: 'Application fee was registered.' })
  async registerFee(@Body() dto: RegisterFeePaymnentDto) {
    const command: RegisterFeePaymentCommand = {
      ...dto,
      feePaid: new Money(dto.fee.amount, dto.fee.currency),
    };
    return this.commandBus.execute(command);
  }

  @Post('approve-applicant')
  @ApiOperation({ summary: 'Approves  Applicant' })
  @ApiCreatedResponse({ description: 'Application was approved.' })
  async aproveApplicant(@Body() dto: ApplicationDecisionDto) {
    const command: ApproveApplicantCommand = { ...dto };
    return this.commandBus.execute(command);
  }

  @Post('reject-applicant')
  @ApiOperation({ summary: 'Reject  Applicant' })
  @ApiCreatedResponse({ description: 'Application was rejected.' })
  async rejectApplicant(@Body() dto: ApplicationDecisionDto) {
    const command: RejectApplicantCommand = { ...dto };
    return this.commandBus.execute(command);
  }

  @Post('appeal-rejection')
  @ApiOperation({ summary: 'Appeal Rejection' })
  @ApiCreatedResponse({ description: 'Rejection was appealed.' })
  async appealRejection(@Body() dto: ApplicationDecisionDto) {
    const command: RejectApplicantCommand = { ...dto };
    return this.commandBus.execute(command);
  }

  @Post('approve-appeal')
  @ApiOperation({ summary: 'Approve Appeal' })
  @ApiCreatedResponse({ description: 'Appeal was approved.' })
  async approveAppeal(@Body() dto: ApplicationDecisionDto) {
    const command: ApproveAppealCommand = { ...dto };
    return this.commandBus.execute(command);
  }

  @Post('reject-appeal')
  @ApiOperation({ summary: 'Reject Appeal' })
  @ApiCreatedResponse({ description: 'Appeal was rejected.' })
  async rejectAppeal(@Body() dto: ApplicationDecisionDto) {
    const command: RejectAppealCommand = { ...dto };
    return this.commandBus.execute(command);
  }
}
