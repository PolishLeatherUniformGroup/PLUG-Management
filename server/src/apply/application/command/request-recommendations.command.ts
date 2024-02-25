import { ICommand } from '@nestjs/cqrs';
import { ApplicantId } from '../../domain/model';
import { Money } from '../../../shared/money';

export class RequestRecommendations implements ICommand {
  constructor(
    public readonly applicantId: ApplicantId,
    public readonly requestDate: Date,
    public readonly requiredFee: Money,
    public readonly recommendersEmails: string[],
    public readonly recommendersNames: string[],
  ) {}
}
