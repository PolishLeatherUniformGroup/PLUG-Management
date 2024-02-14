import { AppealMembershipSuspensionHandler } from "./appeal-membership-suspension.handler";
import { AssignCardNumberHandler } from "./assign-card-number.handler";
import { CancelMembershipHandler } from "./cancel-membership.handler";
import { CreateMemberHandler } from "./create-member.handler";
import { ExpireMembershipHandler } from "./expire-membership.handler";
import { MakeMemberHonoraryHandler } from "./make-member-honorary.handler";
import { MakeMemberRegularHandler } from "./make-member-regular.handler";
import { RegisterMembershipFeePaymentHandler } from "./register-membership-fee-payment.handler";
import { RequestMembershipFeePaymentHandler } from "./request-membership-fee-payment.handler";
import { SuspendMemberHandler } from "./suspend-member.handler";

export * from "./create-member.handler";
export * from "./assign-card-number.handler";
export * from "./request-membership-fee-payment.handler";
export * from "./register-membership-fee-payment.handler";
export * from "./make-member-regular.handler";
export * from "./make-member-honorary.handler";
export * from "./expire-membership.handler";
export * from "./cancel-membership.handler";
export * from "./suspend-member.handler";
export * from "./appeal-membership-suspension.handler";

export const CommandHandlers = [
    CreateMemberHandler,
    AssignCardNumberHandler,
    RequestMembershipFeePaymentHandler,
    RegisterMembershipFeePaymentHandler,
    MakeMemberRegularHandler,
    MakeMemberHonoraryHandler,
    ExpireMembershipHandler,
    CancelMembershipHandler,
    SuspendMemberHandler,
    AppealMembershipSuspensionHandler
];