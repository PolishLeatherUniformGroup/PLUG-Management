import { Domain } from "domain";
import { DomainEvent } from "src/core/domain";

export class MemberSuspensionAppealed implements DomainEvent {
    constructor(public readonly id: string,
        public readonly suspensionId:string,
        public readonly date:Date,
        public readonly justification:string
        ) { }
}