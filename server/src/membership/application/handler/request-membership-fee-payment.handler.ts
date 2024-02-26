import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { RequestMembershipFeePaymentCommand } from '../command/request-membership-fee-payment.command';
import { Inject } from '@nestjs/common';
import { MemberId } from '../../domain/model/member-id';
import { MEMBERS, Members } from '../../domain/repository/members';
import { GetActiveMembersQuery } from '../../infrastructure/query/get-active-members.query';
import { MemberView } from '../../infrastructure/read-model/model/member.entity';
import { AggregateRepository } from '../../../eventstore/aggregate-repository';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Member } from '../../domain/model/member';

@CommandHandler(RequestMembershipFeePaymentCommand)
export class RequestMembershipFeePaymentHandler
  implements ICommandHandler<RequestMembershipFeePaymentCommand>
{
  constructor(
    private readonly members:AggregateRepository, private readonly publisher:StoreEventPublisher,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(command: RequestMembershipFeePaymentCommand) {
    const query = new GetActiveMembersQuery();
    const members: MemberView[] = await this.queryBus.execute(query);
    members.forEach(async (m) => {
      const member =this.publisher.mergeObjectContext( await this.members.getById(Member,MemberId.fromString(m.id).value));
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
