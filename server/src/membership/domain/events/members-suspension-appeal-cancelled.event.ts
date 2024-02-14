import { DomainEvent } from "src/core/domain";

export class MemberSuspensionAppealCancelled  implements DomainEvent{
    constructor(public id: string, public suspensionId: string) {
    }
}