import { ICommand } from '@nestjs/cqrs';
import { ApplicantId } from '../../domain/model';

export class RejectApplicationCommand implements ICommand {
  constructor(
    public readonly id: ApplicantId,
    public readonly decision: string,
    public readonly decisionDate: Date,
  ) {}
}
