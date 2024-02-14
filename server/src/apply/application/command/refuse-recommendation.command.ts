import { ICommand } from '@nestjs/cqrs';
import { ApplicantId } from 'src/apply/domain/model';

export class RefuseRecommendationCommand implements ICommand {
  constructor(
    public readonly applicantId: ApplicantId,
    public readonly recommendationId: string,
  ) {}
}
