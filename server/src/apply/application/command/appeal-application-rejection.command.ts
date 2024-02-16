import { ICommand } from '@nestjs/cqrs';
import { ApplicantId } from 'src/apply/domain/model';

export class AppealApplicationRejectionCommand implements ICommand {
  constructor(
    public readonly id: ApplicantId,
    public readonly justification: string,
    public readonly appealDate: Date,
  ) {}
}
