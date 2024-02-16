import { IQuery } from "@nestjs/cqrs";

export class GetMemberQuery implements IQuery{
    constructor(public readonly id: string) {}
}