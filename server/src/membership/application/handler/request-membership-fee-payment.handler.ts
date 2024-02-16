import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { RequestMembershipFeePaymentCommand } from '../command/request-membership-fee-payment.command';
import { Inject } from '@nestjs/common';
import { MEMBERS, Members } from 'src/membership/domain/repository/members';
import { GetActiveMembersQuery } from 'src/membership/infrastructure/query/get-active-members.query';
import { MemberView } from 'src/membership/infrastructure/read-model/model/member.entity';
import { MemberId } from 'src/membership/domain/model/member-id';

@CommandHandler(RequestMembershipFeePaymentCommand)
export class RequestMembershipFeePaymentHandler
  implements ICommandHandler<RequestMembershipFeePaymentCommand>
{
  constructor(
    @Inject(MEMBERS) private readonly members: Members,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(command: RequestMembershipFeePaymentCommand) {
    const query = new GetActiveMembersQuery();
    const members: MemberView[] = await this.queryBus.execute(query);
    members.forEach(async (m) => {
      const member = await this.members.get(MemberId.fromString(m.id));
      if (member) {
        member.requestMembershipFeePayment(
          command.year,
          command.amount,
          command.dueDate,
        );
        await this.members.save(member);
      }
    });
  }
}
