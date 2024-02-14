import { DomainEvent } from "src/core/domain";
import { MemberType } from "../model/member-type";

export class MemberTypeChanged implements DomainEvent {
    constructor(
        public readonly id: string, 
        public readonly type: MemberType,) {
      
    }
}