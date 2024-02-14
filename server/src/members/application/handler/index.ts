import { AssignCardNumberHandler } from "./assign-card-number.handler";
import { CreateMemberHandler } from "./create-member.handler";

export * from "./create-member.handler";
export * from "./assign-card-number.handler";

export const CommandHandlers = [
    CreateMemberHandler,
    AssignCardNumberHandler
];