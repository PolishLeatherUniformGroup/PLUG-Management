import { MEMBERS } from "../domain/repository/members";
import { MemberEventStore } from "./eventstore/member-event-store";

export const MembersProviders =[
    {
        provide : MEMBERS,
        useClass: MemberEventStore
    }
]