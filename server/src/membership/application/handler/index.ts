import { AppealMembershipSuspensionHandler } from './appeal-membership-suspension.handler';
import { AssignCardNumberHandler } from './assign-card-number.handler';
import { CancelMembershipHandler } from './cancel-membership.handler';
import { CreateMemberHandler } from './create-member.handler';
import { ExpireMembershipHandler } from './expire-membership.handler';
import { MakeMemberHonoraryHandler } from './make-member-honorary.handler';
import { MakeMemberRegularHandler } from './make-member-regular.handler';
import { RegisterMembershipFeePaymentHandler } from './register-membership-fee-payment.handler';
import { RequestMembershipFeePaymentHandler } from './request-membership-fee-payment.handler';
import { SuspendMemberHandler } from './suspend-member.handler';
import { AcceptMemberSuspensionAppealHandler } from './accept-member-suspension-appeal.handler';
import { RejectMemberSuspensionAppealHandler } from './reject-member-suspension-appeal.handler';
import { EndMemberSuspensionHandler } from './end-member-suspension.handler';
import { ExpelMemberHandler } from './expel-member.handler';
import { AppealMemberExpulsionHandler } from './appeal-member-expulsion.handler';
import { AcceptMemberExpulsionAppealHandler } from './accept-member-expulsion-appeal.handler';
import { RejectMemberExpulsionAppealHandler } from './reject-member-expulsion-appeal.handler';

export * from './create-member.handler';
export * from './assign-card-number.handler';
export * from './request-membership-fee-payment.handler';
export * from './register-membership-fee-payment.handler';
export * from './make-member-regular.handler';
export * from './make-member-honorary.handler';
export * from './expire-membership.handler';
export * from './cancel-membership.handler';
export * from './suspend-member.handler';
export * from './appeal-membership-suspension.handler';
export * from './reject-member-suspension-appeal.handler';
export * from './accept-member-suspension-appeal.handler';
export * from './end-member-suspension.handler';
export * from './expel-member.handler';
export * from './appeal-member-expulsion.handler';
export * from './accept-member-expulsion-appeal.handler';
export * from './reject-member-expulsion-appeal.handler';

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
  AppealMembershipSuspensionHandler,
  RejectMemberSuspensionAppealHandler,
  AcceptMemberSuspensionAppealHandler,
  EndMemberSuspensionHandler,
  ExpelMemberHandler,
  AppealMemberExpulsionHandler,
  AcceptMemberExpulsionAppealHandler,
  RejectMemberExpulsionAppealHandler,
];
