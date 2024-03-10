import { ICommand } from "@nestjs/cqrs";
import { MemberId } from "../../domain/model/member-id";

export class CreatAccountCommand implements ICommand {
    constructor(
      public readonly card: string
    ) {}
  }