import { IQuery } from "@nestjs/cqrs";

export class GetMemberFeesQuery implements IQuery{
    constructor(public readonly id: string) {}
}