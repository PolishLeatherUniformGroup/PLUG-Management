
import { AssignCardNumberHandler } from "./assign-card-number.handler";
import { CreateMemberHandler } from "./create-member.handler";
import { RegisterMembershipFeePaymentHandler } from "./register-membership-fee-payment.handler";
import { RequestMembershipFeePaymentHandler } from "./request-membership-fee-payment.handler";

export * from "./create-member.handler";
export * from "./assign-card-number.handler";
export * from "./request-membership-fee-payment.handler";
export * from "./register-membership-fee-payment.handler";

export const CommandHandlers = [
    CreateMemberHandler,
    AssignCardNumberHandler,
    RequestMembershipFeePaymentHandler,
    RegisterMembershipFeePaymentHandler
];