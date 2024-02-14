import { MemberCardAssignedProjection } from './member-card-assigned.projection';
import { MemberCreatedProjection } from './member-created.projection';

export * from './member-created.projection'
export * from './member-card-assigned.projection'

export const Projections = [
    MemberCreatedProjection,
    MemberCardAssignedProjection
];