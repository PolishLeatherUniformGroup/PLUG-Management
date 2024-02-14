import { MemberCardAssignedProjection } from './member-card-assigned.projection';
import { MemberCreatedProjection } from './member-created.projection';
import { MembershipFeeRequestedProjection } from './membership-fee-requested.projection';

export * from './member-created.projection'
export * from './member-card-assigned.projection'
export * from './membership-fee-requested.projection'

export const Projections = [
    MemberCreatedProjection,
    MemberCardAssignedProjection,
    MembershipFeeRequestedProjection
];