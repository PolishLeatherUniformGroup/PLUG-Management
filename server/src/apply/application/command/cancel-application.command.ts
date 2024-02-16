import { ICommand } from '@nestjs/cqrs';
import { ApplicantId } from 'src/apply/domain/model';

export class CancelApplicationCommand implements ICommand {
  constructor(public readonly applicantId: ApplicantId) {}
}
