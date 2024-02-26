import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { RegisterFeePaymentCommand } from '../../../apply/application/command/register-fee-payment.command';
import { RegisterFeePaymentRequestDto } from '../../../apply/infrastructure/dto/register-fee-payment-request.dto';
import { JwtGuard } from '../../../auth/jwt.guard';
import { Address } from '../../../shared/address';
import { Money } from '../../../shared/money';
import { AcceptMemberExpulsionAppealCommand } from '../../application/command/accept-member-expulsion-appeal.command';
import { AcceptMemberSuspensionAppealCommand } from '../../application/command/accept-member-suspension-appeal.command';
import { AddMemberCommand } from '../../application/command/add-member.command';
import { AppealMemberExpulsionCommand } from '../../application/command/appeal-member-expulsion.command';
import { AppealMembershipSuspensionCommand } from '../../application/command/appeal-membership-suspension.command';
import { CancelMembershipCommand } from '../../application/command/cancel-membership.command';
import { EndMemberSuspensionCommand } from '../../application/command/end-member-suspension.command';
import { ExpelMemberCommand } from '../../application/command/expel-member.command';
import { ExpireMembershipCommand } from '../../application/command/expire-membership.command';
import { MakeMemberHonoraryCommand } from '../../application/command/make-member-honorary.command';
import { MakeMemberRegularCommand } from '../../application/command/make-member-regular.command';
import { RejectMemberExpulsionAppealCommand } from '../../application/command/reject-member-expulsion-appeal.command';
import { RejectMemberSuspensionAppealCommand } from '../../application/command/reject-member-suspension-appeal.command';
import { RequestMembershipFeePaymentCommand } from '../../application/command/request-membership-fee-payment.command';
import { SuspendMemberCommand } from '../../application/command/suspend-member.command';
import { MemberId } from '../../domain/model/member-id';
import { MembershipFee } from '../../domain/model/membership-fee';
import { AcceptSuspensionAppealRequestDto } from '../dto/accept-suspension-appeal-request.dto';
import { AddMemberRequestDto } from '../dto/add-member-request.dto';
import { AppealExpulsionRequestDto } from '../dto/appeal-expulsion-request.dto';
import { AppealSuspensionRequestDto } from '../dto/appeal-suspension-request.dto';
import { CancelMembershipRequestDto } from '../dto/cancel-membership-request.dto';
import { EndSuspensionRequestDto } from '../dto/end-suspension-request.dto';
import { ExpelMemberRequestDto } from '../dto/expel-member-request.dto';
import { ExpireMembershipRequestDto } from '../dto/expire-membership-request.dto';
import { MakeMemberHonoraryRequestDto } from '../dto/make-member-honorary-request.dto';
import { MakeMemberRegularRequestDto } from '../dto/make-member-regular-request.dto';
import { RejectExpulsionAppealRequestDto } from '../dto/reject-expulsion-appeal-request.dto';
import { RejectSuspensionAppealRequestDto } from '../dto/reject-suspension-appeal-request.dto';
import { RequestMembershipFeePaymentDto } from '../dto/request-membership-fee-payment-dto';
import { SuspendMemberRequestDto } from '../dto/suspend-member-request.dto';

@Controller('membership/commands')
@ApiTags('membership')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class CommandController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('create-member')
  @ApiOperation({ summary: 'Manual member creation' })
  @ApiResponse({ status: 204, description: 'Member created.' })
  async createMember(@Body() payload: AddMemberRequestDto) {
    try {
      const newId = MemberId.fromUUID(randomUUID());
      const command: AddMemberCommand = new AddMemberCommand(
        newId,
        payload.card,
        payload.firstName,
        payload.lastName,
        payload.email,
        payload.phoneNumber,
        payload.joinDate,
        payload.birthDate,
        Address.fromDto(payload.address),
        MembershipFee.initialFeeForMember(
          newId,
          Money.create(
            payload.initialFee.dueAmount.amount,
            payload.initialFee.dueAmount.currency,
          ),
          Money.create(
            payload.initialFee.paidAmount?.amount ?? 0,
            payload.initialFee.paidAmount?.currency ?? 'PLN',
          ),
          payload.initialFee.paidDate ?? new Date(),
        ),
      );

      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('make-member-regular')
  @ApiOperation({ summary: 'Make member regular' })
  @ApiResponse({ status: 204, description: 'Member type changed.' })
  async makeMemberRegular(@Body() payload: MakeMemberRegularRequestDto) {
    try {
      const command = new MakeMemberRegularCommand(
        MemberId.fromString(payload.memberId),
      );
      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('make-member-honorary')
  @ApiOperation({ summary: 'Make member honorary' })
  @ApiResponse({ status: 204, description: 'Member type changed.' })
  async makeMemberHonorary(@Body() payload: MakeMemberHonoraryRequestDto) {
    try {
      const command = new MakeMemberHonoraryCommand(
        MemberId.fromString(payload.memberId),
      );
      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('cancel-membership')
  @ApiOperation({ summary: 'Cancel membership' })
  @ApiResponse({ status: 204, description: 'Membership cancelled.' })
  async cancelMembership(@Body() payload: CancelMembershipRequestDto) {
    try {
      const command = new CancelMembershipCommand(
        MemberId.fromString(payload.memberId),
        payload.date,
      );
      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('expire-membership')
  @ApiOperation({ summary: 'Expire membership' })
  @ApiResponse({ status: 204, description: 'Membership expired.' })
  async expireMembership(@Body() payload: ExpireMembershipRequestDto) {
    try {
      const command = new ExpireMembershipCommand(
        MemberId.fromString(payload.memberId),
        payload.date,
      );
      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('suspend-member')
  @ApiOperation({ summary: 'suspend member' })
  @ApiResponse({ status: 204, description: 'Member suspended.' })
  async suspendMember(@Body() payload: SuspendMemberRequestDto) {
    try {
      const command = new SuspendMemberCommand(
        MemberId.fromString(payload.memberId),
        payload.date,
        payload.reason,
        payload.suspendedUntil,
      );
      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('appeal-suspension')
  @ApiOperation({ summary: 'Appeal suspension' })
  @ApiResponse({ status: 204, description: 'Suspension appeal sent.' })
  async appealSuspension(@Body() payload: AppealSuspensionRequestDto) {
    try {
      const command = new AppealMembershipSuspensionCommand(
        MemberId.fromString(payload.memberId),
        payload.suspensionId,
        payload.date,
        payload.justification,
      );
      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('accept-suspension-appeal')
  @ApiOperation({ summary: 'Accept suspension appeal' })
  @ApiResponse({ status: 204, description: 'Suspension appeal accepted.' })
  async acceptSuspensionAppeal(
    @Body() payload: AcceptSuspensionAppealRequestDto,
  ) {
    try {
      const command = new AcceptMemberSuspensionAppealCommand(
        MemberId.fromString(payload.memberId),
        payload.suspensionId,
        payload.date,
        payload.decision,
      );
      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('reject-suspension-appeal')
  @ApiOperation({ summary: 'Reject suspension appeal' })
  @ApiResponse({ status: 204, description: 'Suspension appeal rejected.' })
  async rejestSuspensionAppeal(
    @Body() payload: RejectSuspensionAppealRequestDto,
  ) {
    try {
      const command = new RejectMemberSuspensionAppealCommand(
        MemberId.fromString(payload.memberId),
        payload.suspensionId,
        payload.date,
        payload.decision,
      );
      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('end-suspension')
  @ApiOperation({ summary: 'end suspension' })
  @ApiResponse({ status: 204, description: 'Suspension ended.' })
  async endSuspension(@Body() payload: EndSuspensionRequestDto) {
    try {
      const command = new EndMemberSuspensionCommand(
        MemberId.fromString(payload.memberId),
      );
      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('expel-member')
  @ApiOperation({ summary: 'Expel member' })
  @ApiResponse({ status: 204, description: 'Member expelled.' })
  async expelMember(@Body() payload: ExpelMemberRequestDto) {
    try {
      const command = new ExpelMemberCommand(
        MemberId.fromString(payload.memberId),
        payload.date,
        payload.reason,
      );
      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('appeal-expulsion')
  @ApiOperation({ summary: 'Appeal expulsion' })
  @ApiResponse({ status: 204, description: 'Expulsion appeal sent.' })
  async appealExpulsion(@Body() payload: AppealExpulsionRequestDto) {
    try {
      const command = new AppealMemberExpulsionCommand(
        MemberId.fromString(payload.memberId),
        payload.expulsionId,
        payload.date,
        payload.justification,
      );
      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('accept-expulsion-appeal')
  @ApiOperation({ summary: 'Accept suspension appeal' })
  @ApiResponse({ status: 204, description: 'Suspension appeal accepted.' })
  async acceptExpulsionAppeal(@Body() payload: AppealExpulsionRequestDto) {
    try {
      const command = new AcceptMemberExpulsionAppealCommand(
        MemberId.fromString(payload.memberId),
        payload.expulsionId,
        payload.date,
        payload.justification,
      );
      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('reject-expulsion-appeal')
  @ApiOperation({ summary: 'Reject suspension appeal' })
  @ApiResponse({ status: 204, description: 'Suspension appeal rejected.' })
  async rejestExpulsionAppeal(
    @Body() payload: RejectExpulsionAppealRequestDto,
  ) {
    try {
      const command = new RejectMemberExpulsionAppealCommand(
        MemberId.fromString(payload.memberId),
        payload.expulsionId,
        payload.date,
        payload.decision,
      );
      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('request-fee-payment')
  @ApiOperation({ summary: 'Request fee payment' })
  @ApiResponse({ status: 204, description: 'Fee Payment requested.' })
  async requestFeePayment(@Body() payload: RequestMembershipFeePaymentDto) {
    try {
      const command = new RequestMembershipFeePaymentCommand(
        payload.year,
        Money.create(payload.amount.amount, payload.amount.currency),
        payload.dueDate,
      );
      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('register-fee-payment')
  @ApiOperation({ summary: 'Register Fee Payment' })
  @ApiResponse({ status: 204, description: 'Fee pyment registered.' })
  async registerFeePayment(@Body() payload: RegisterFeePaymentRequestDto) {
    try {
      const command = new RegisterFeePaymentCommand(
        MemberId.fromString(payload.id),
        payload.paymentDate,
        Money.create(payload.fee.amount, payload.fee.currency),
      );
      await this.commandBus.execute(command);
    } catch (error) {
      console.error(error);
    }
  }
}
