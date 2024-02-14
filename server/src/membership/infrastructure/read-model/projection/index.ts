import { MemberCardAssignedProjection } from './member-card-assigned.projection';
import { MemberCreatedProjection } from './member-created.projection';
import { MembershipFeeRequestedProjection } from './membership-fee-requested.projection';
import { MembershipFeePaidProjection } from './membership-fee-paid.projection';
import { MemberTypeChangedProjection } from './member-type-changed.projection';
import { MembershipExpiredProjection } from './membership-expired.projection';
import { MembershipCancelledProjection } from './membership-cancelled.projection';
import { MemberSuspendedProjection } from './member-suspended.projection';
import { MemberSuspensionAppealedProjection } from './member-suspension-appealed.projection';
import { MemberSuspensionAppealCancelledProjection } from './member-suspension-appeal-cancelled.projection';
import { MemberSuspensionAppealAcceptedProjection } from './member-suspension-appeal-accepted.projection';

export * from './member-created.projection'
export * from './member-card-assigned.projection'
export * from './membership-fee-requested.projection'
export * from './membership-fee-paid.projection'
export * from './member-type-changed.projection'
export * from './membership-expired.projection'
export * from './membership-cancelled.projection'
export * from './member-suspended.projection'
export * from './member-suspension-appealed.projection'
export * from './member-suspension-appeal-cancelled.projection'
export * from './member-suspension-appeal-accepted.projection'


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
    MemberSuspensionAppealCancelledProjection,
    MemberSuspensionAppealAcceptedProjection
];