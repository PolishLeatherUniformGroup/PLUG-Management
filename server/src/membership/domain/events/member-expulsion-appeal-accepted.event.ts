import { DomainEvent } from "src/core/domain";


export class MemberExpulsionAppealAccepted implements DomainEvent {
    constructor(public id: string, public expulsionId: string, public date: Date, public decision: string) {
    }
}
