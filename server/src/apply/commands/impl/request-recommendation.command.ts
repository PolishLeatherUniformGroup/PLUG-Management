import { Money } from 'src/models/money.model';

export class RequestRecommendationCommand {
  constructor(
    public id: string,
    public date: Date,
    public requiredFee?: Money,
  ) {}
}
