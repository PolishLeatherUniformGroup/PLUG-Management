import { ICommand } from '@nestjs/cqrs';
import { ApplicantId } from '../../domain/model';

export class ConfirmRecommendationCommand implements ICommand {
  constructor(
    public readonly applicantId: ApplicantId,
    public readonly recommendationId: string,
  ) {}
}
