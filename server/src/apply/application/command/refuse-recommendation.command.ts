import { ICommand } from '@nestjs/cqrs';
import { ApplicantId } from '../../domain/model';

export class RefuseRecommendationCommand implements ICommand {
  constructor(
    public readonly applicantId: ApplicantId,
    public readonly recommendationId: string,
  ) {}
}
