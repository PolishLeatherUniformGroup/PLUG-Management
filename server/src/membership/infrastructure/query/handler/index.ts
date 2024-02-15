import { GetActiveMembersHandler } from "./get-active-members.handler";
import { GetMemberHandler } from "./get-member.handler";
import { GetMembersHandler } from "./get-members.handler";

export * from './get-active-members.handler'
export * from './get-members.handler'
export * from './get-member.handler'

export const QueryHandlers =[
    GetActiveMembersHandler,
    GetMembersHandler,
    GetMemberHandler
]