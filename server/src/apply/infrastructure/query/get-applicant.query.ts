import { IQuery } from '@nestjs/cqrs';

export class GetApplicantQuery implements IQuery {
  constructor(public readonly id: string) {}
}
