import { ICommand } from "@nestjs/cqrs";

export class AppealSuspensionCommand implements ICommand{
    constructor(public readonly memberId: string, public readonly date: Date, public readonly reason: string) { }
}