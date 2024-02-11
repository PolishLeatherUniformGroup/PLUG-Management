import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddMemberCommand } from './commands/impl/add-member.command';
import { AddMemberDto } from './dtos/add-member.dto';
import { Money } from 'src/models/money.model';
import { RequestFeeDto } from './dtos/request-fee-dto';
import { RequestFeeCommand } from './commands/impl/request-fee-command';
import { RegisterFeePaymentDto } from './dtos/register-fee-payment.dto';
import { RegisterFeePaymentCommand } from './commands/impl/register-fee-payment.command';
import { MembershipSuspensionDto } from './dtos/membership-suspension.dto';
import { SuspendMemberCommand } from './commands/impl/supsend-member.command';
import { MembershipExpellDto } from './dtos/membership-expell.dto';
import { ExpellMemberCommand } from './commands/impl/expel-member.command';
import { AppealDto } from './dtos/appeal.dto';
import { AppealSuspensionCommand } from './commands/impl/appeal-suspension.command';
import { AppealExpellCommand } from './commands/impl/appeal-expell.command';
import { AppealDecisionDto } from './dtos/appeal-decision.dto';
import { ApproveSuspensionAppealCommand } from './commands/impl/approve-suspension-appeal.command';
import { RejectSuspensionAppealCommand } from './commands/impl/reject-suspension-appeal.command';
import { ApproveExpellAppealCommand } from './commands/impl/approve-expell-appeal.command';
import { RejectExpellAppealCommand } from './commands/impl/reject-expell-appeal.command';
import { CancelMembershipCommand } from './commands/impl/cancel-membership.command';
import { EndMembershipDto } from './dtos/end-membership.dto';
import { ExpireMembershipCommand } from './commands/impl/expire-mmbership.command';

@Controller('membership')
@ApiTags('membership')
export class MembershipController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('add-member')
  @ApiOperation({ summary: 'Add members' })
  @ApiCreatedResponse({ description: 'Member was created' })
  async addMember(@Body() dto: AddMemberDto) {
    const command = new AddMemberCommand(
      dto.firstName,
      dto.lastName,
      dto.email,
      dto.phoneNumber,
      dto.address,
      dto.birthDate,
      dto.joinDate,
      new Money(dto.paidFeeAmount.amount, dto.paidFeeAmount.currency),
      dto.paidFeeDate,
    );
    return this.commandBus.execute(command);
  }

  @Post('request-fee')
  @ApiOperation({ summary: 'Request fee payment' })
  @ApiCreatedResponse({ description: 'Fee payment request was sent' })
  async requestFeePayment(@Body() dto: RequestFeeDto) {
    const command = new RequestFeeCommand(
      dto.year,
      new Money(dto.feeAmount.amount, dto.feeAmount.currency),
      dto.feeDueDate,
    );
    return this.commandBus.execute(command);
  }

  @Post('register-fee-payment')
  @ApiOperation({ summary: 'Register fee payment' })
  @ApiCreatedResponse({ description: 'Fee payment registred' })
  async registerFeePayment(@Body() dto: RegisterFeePaymentDto) {
    const command = new RegisterFeePaymentCommand(
      dto.memberId,
      dto.feeId,
      new Money(dto.paidAmount.amount, dto.paidAmount.currency),
      dto.paidDate,
    );
    return this.commandBus.execute(command);
  }

  @Post('suspend-member')
  @ApiOperation({ summary: 'Register fee payment' })
  @ApiCreatedResponse({ description: 'Fee payment registred' })
  async suspendMember(@Body() dto: MembershipSuspensionDto) {
    const command = new SuspendMemberCommand(
      dto.memberId,
      dto.decisionDate,
      dto.reason,
      dto.suspendUntil,
    );
    return this.commandBus.execute(command);
  }

  @Post('appeal-suspension')
  @ApiOperation({ summary: 'Register fee payment' })
  @ApiCreatedResponse({ description: 'Fee payment registred' })
  async appealSuspension(@Body() dto: AppealDto) {
    const command = new AppealSuspensionCommand(
      dto.memberId,
      dto.appealDate,
      dto.reason,
    );
    return this.commandBus.execute(command);
  }

  @Post('approve-suspension-appeal')
  @ApiOperation({ summary: 'Register fee payment' })
  @ApiCreatedResponse({ description: 'Fee payment registred' })
  async approveSuspensionAppeal(@Body() dto: AppealDecisionDto) {
    const command = new ApproveSuspensionAppealCommand(
      dto.memberId,
      dto.reason,
      dto.decisionDate
    );
    return this.commandBus.execute(command);
  }

  @Post('reject-suspension-appeal')
  @ApiOperation({ summary: 'Register fee payment' })
  @ApiCreatedResponse({ description: 'Fee payment registred' })
  async rejectSuspensionAppeal(@Body() dto: AppealDecisionDto) {
    const command = new RejectSuspensionAppealCommand(
      dto.memberId,
      dto.reason,
      dto.decisionDate
    );
    return this.commandBus.execute(command);
  }

  @Post('expell-member')
  @ApiOperation({ summary: 'Register fee payment' })
  @ApiCreatedResponse({ description: 'Fee payment registred' })
  async expellMember(@Body() dto: MembershipExpellDto) {
    const command = new ExpellMemberCommand(
      dto.memberId,
      dto.decisionDate,
      dto.reason,
    );
    return this.commandBus.execute(command);
  }

  @Post('appeal-expell')
  @ApiOperation({ summary: 'Register fee payment' })
  @ApiCreatedResponse({ description: 'Fee payment registred' })
  async appealExpell(@Body() dto: AppealDto) {
    const command = new AppealExpellCommand(
      dto.memberId,
      dto.appealDate,
      dto.reason,
    );
    return this.commandBus.execute(command);
  }


  @Post('approve-expell-appeal')
  @ApiOperation({ summary: 'Register fee payment' })
  @ApiCreatedResponse({ description: 'Fee payment registred' })
  async approveExpellAppeal(@Body() dto: AppealDecisionDto) {
    const command = new ApproveExpellAppealCommand(
      dto.memberId,
      dto.reason,
      dto.decisionDate
    );
    return this.commandBus.execute(command);
  }

  @Post('reject-expell-appeal')
  @ApiOperation({ summary: 'Register fee payment' })
  @ApiCreatedResponse({ description: 'Fee payment registred' })
  async rejectExpellAppeal(@Body() dto: AppealDecisionDto) {
    const command = new RejectExpellAppealCommand(
      dto.memberId,
      dto.reason,
      dto.decisionDate
    );
    return this.commandBus.execute(command);
  }

  @Post('cancel-membership')
  @ApiOperation({ summary: 'Register fee payment' })
  @ApiCreatedResponse({ description: 'Fee payment registred' })
  async cancelMembership(@Body() dto: EndMembershipDto) {
    const command = new CancelMembershipCommand(
      dto.memberId,
      dto.date
    );
    return this.commandBus.execute(command);
  }

  @Post('expire-membership')
  @ApiOperation({ summary: 'Register fee payment' })
  @ApiCreatedResponse({ description: 'Fee payment registred' })
  async expireMembership(@Body() dto: EndMembershipDto) {
    const command = new ExpireMembershipCommand(
      dto.memberId,
      dto.date
    );
    return this.commandBus.execute(command);
  }

}
