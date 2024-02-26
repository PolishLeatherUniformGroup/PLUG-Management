import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { RequestMembershipFeePaymentCommand } from '../command/request-membership-fee-payment.command';
import { MemberId } from '../../domain/model/member-id';
import { GetActiveMembersQuery } from '../../infrastructure/query/get-active-members.query';
import { MemberView } from '../../infrastructure/read-model/model/member.entity';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Member } from '../../domain/model/member';
import { MemberAggregateRepository } from '../../infrastructure/repository/member-aggregate-repository';

@CommandHandler(RequestMembershipFeePaymentCommand)
export class RequestMembershipFeePaymentHandler
  implements ICommandHandler<RequestMembershipFeePaymentCommand>
{
  constructor(
    private readonly members:MemberAggregateRepository, private readonly publisher:StoreEventPublisher,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(command: RequestMembershipFeePaymentCommand) {
    const query = new GetActiveMembersQuery();
    const members: MemberView[] = await this.queryBus.execute(query);
    members.forEach(async (m) => {
      const member =this.publisher.mergeObjectContext( await this.members.getById(Member,MemberId.fromString(m.memberId).value));
      if (member) {
        member.requestMembershipFeePayment(
          command.year,
          command.amount,
          command.dueDate,
        );
        await member.commit();
      }
    });
  }
}
