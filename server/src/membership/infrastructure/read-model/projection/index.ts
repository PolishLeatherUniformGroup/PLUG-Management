import { MemberCardAssignedProjection } from './member-card-assigned.projection';
import { MemberCreatedProjection } from './member-created.projection';
import { MembershipFeeRequestedProjection } from './membership-fee-requested.projection';
import { MembershipFeePaidProjection } from './membership-fee-paid.projection';
import { MemberTypeChangedProjection } from './member-type-changed.projection';
import { MembershipExpiredProjection } from './membership-expired.projection';
import { MembershipCancelledProjection } from './membership-cancelled.projection';
import { MemberSuspendedProjection } from './member-suspended.projection';
import { MemberSuspensionAppealedProjection } from './member-suspension-appealed.projection';
import { MembershipSuspensionAppealCancelledProjection } from './membership-suspension-appeal-cancelled.projection';
import { MembershipSuspensionAppealAcceptedProjection } from './membership-suspension-appeal-accepted.projection';
import { MemberSuspensionAppealRejectedProjection } from './membership-suspension-appeal-rejected.projection';
import { MemberExpelledProjection } from './member-expelled.projection';
import { MemberExpulsionAppealedProjection } from './member-expulsion-appealed.projection';
import { MemberExpulsionAppealAcceptedProjection } from './member-expulsion-appeal-accepted.projection';
import { MemberExpulsionAppealRejectedProjection } from './member-expulsion-appeal-rejected.projection';
import { MemberExpulsionAppealCancelledProjection } from './member-expulsion-appeal-cancelled.projection';

export * from './member-created.projection';
export * from './member-card-assigned.projection';
export * from './membership-fee-requested.projection';
export * from './membership-fee-paid.projection';
export * from './member-type-changed.projection';
export * from './membership-expired.projection';
export * from './membership-cancelled.projection';
export * from './member-suspended.projection';
export * from './member-suspension-appealed.projection';
export * from './membership-suspension-appeal-cancelled.projection';
export * from './membership-suspension-appeal-accepted.projection';
export * from './membership-suspension-appeal-rejected.projection';
export * from './member-expelled.projection';
export * from './member-expulsion-appealed.projection';
export * from './member-expulsion-appeal-accepted.projection';
export * from './member-expulsion-appeal-rejected.projection';
export * from './member-expulsion-appeal-cancelled.projection';

export const Projections = [
  MemberCreatedProjection,
  MemberCardAssignedProjection,
  MembershipFeeRequestedProjection,
  MembershipFeePaidProjection,
  MemberTypeChangedProjection,
  MembershipExpiredProjection,
  MembershipCancelledProjection,
  MemberSuspendedProjection,
  MemberSuspensionAppealedProjection,
  MembershipSuspensionAppealCancelledProjection,
  MembershipSuspensionAppealAcceptedProjection,
  MemberSuspensionAppealRejectedProjection,
  MemberExpelledProjection,
  MemberExpulsionAppealedProjection,
  MemberExpulsionAppealAcceptedProjection,
  MemberExpulsionAppealRejectedProjection,
  MemberExpulsionAppealCancelledProjection,
];
