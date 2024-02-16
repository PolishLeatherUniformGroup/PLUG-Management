import { ICommand } from '@nestjs/cqrs';
import { ApplicantId } from 'src/apply/domain/model';

export class ConfirmRecommendationCommand implements ICommand {
  constructor(
    public readonly applicantId: ApplicantId,
    public readonly recommendationId: string,
  ) {}
}
