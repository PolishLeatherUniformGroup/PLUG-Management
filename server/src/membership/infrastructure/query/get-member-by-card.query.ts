import { IQuery } from "@nestjs/cqrs";

export class GetMemberByCardQuery implements IQuery {
  constructor(public readonly card: string) {}
}