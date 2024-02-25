import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipFeePaid } from '../../../domain/events';
import { MembershipFeeView } from '../model/membership-fee.entity';

@EventsHandler(MembershipFeePaid)
export class MembershipFeePaidProjection
  implements IEventHandler<MembershipFeePaid>
{
  constructor(
    @InjectRepository(MembershipFeeView)
    private readonly repository: Repository<MembershipFeeView>,
  ) {}

  async handle(event: MembershipFeePaid) {
    const fee = await this.repository.findOne({
      where: { feeId: event.feeId },
    });
    if (!fee) {
      throw new Error('Membership fee not found');
    }
    fee.paidAmount = event.amount.amount;
    fee.paidDate = event.paidDate;
    this.repository.save(fee);
  }
}
