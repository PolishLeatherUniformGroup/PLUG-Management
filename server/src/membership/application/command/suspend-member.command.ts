import { ICommand } from "@nestjs/cqrs";
import { MemberId } from "src/membership/domain/model/member-id";

export class SuspendMemberCommand  implements ICommand{
    constructor(
        public readonly id: MemberId,
        public readonly date: Date,
        public readonly reason: string,
        public readonly suspensionEndDate: Date) { }
}