import { DomainEvent } from "src/core/domain";

export class MemberSuspensionEnded implements DomainEvent {
    public constructor(
        public readonly id: string){
    }
}