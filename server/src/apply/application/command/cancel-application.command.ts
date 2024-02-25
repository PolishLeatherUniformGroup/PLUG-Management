import { ICommand } from '@nestjs/cqrs';
import { ApplicantId } from '../../domain/model';

export class CancelApplicationCommand implements ICommand {
  constructor(public readonly applicantId: ApplicantId) {}
}
