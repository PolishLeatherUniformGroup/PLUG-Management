import { Address } from 'src/shared/address';
import { MembershipFee } from '../model/membership-fee';
import { MemberCreated } from './member-created.event';
import { MemberCardAssigned } from './member-card-assigned.event';
import { MemberCard } from '../model/member-card';
import { MembershipFeeRequested } from './membership-fee-requested.event';
import { Money } from 'src/shared/money';
import { MembershipFeePaid } from './membership-fee-paid.event';
import { MemberTypeChanged } from './member-type-changed.event';
import { MemberType } from '../model/member-type';
import { MembershipExpired } from './membership-expired.event';
import { MembershipCancelled } from './membership-cancelled.event';
import { MemberSuspended } from './member-suspended.event';
import { MemberSuspensionAppealed } from './member-suspension-appealed.event';
import { MemberSuspensionAppealCancelled } from './members-suspension-appeal-cancelled.event';
import { MembershipSuspensionAppealAccepted } from './membership-suspension-appeal-accepted.event';

export * from './member-created.event';
export * from './member-card-assigned.event';
export * from './membership-fee-requested.event';
export * from './membership-fee-paid.event';
export * from './member-type-changed.event';
export * from './membership-expired.event';
export * from './membership-cancelled.event';
export * from './member-suspended.event';
export * from './member-suspension-appealed.event';
export * from './members-suspension-appeal-cancelled.event';

export { MemberCreated, MemberCardAssigned, MembershipFeeRequested, MembershipFeePaid, MemberTypeChanged, MembershipExpired, MembershipCancelled, MemberSuspended, MemberSuspensionAppealed, MemberSuspensionAppealCancelled};
export const MembersEvents = {
    MemberCreated: (id: string, firstName: string, lastName: string, email: string, phoneNumber: string, joinDate: Date, birthDate: Date, address: Address, initialFee: MembershipFee) => new MemberCreated(id, firstName, lastName, email, phoneNumber, joinDate, birthDate, address, initialFee),
    MemberCardAssigned: (id: string, cardNumber: MemberCard) => new MemberCardAssigned(id, cardNumber),
    MembershipFeeRequested: (id: string, year: number, amount: Money, dueDate: Date) => new MembershipFeeRequested(id, year, amount, dueDate),
    MembershipFeePaid: (id: string, feeId: string, amount: Money, paidDate: Date) => new MembershipFeePaid(id, feeId, amount, paidDate),
    MemberTypeChanged: (id: string, type: MemberType) => new MemberTypeChanged(id, type),
    MembershipExpired: (id: string, date: Date) => new MembershipExpired(id, date),
    MembershipCancelled: (id: string, date: Date) => new MembershipCancelled(id, date),
    MemberSuspended: (id: string,suspensionId:string, date:Date, reason:string, suspensionEndDate:Date,appealDeadline:Date) => new MemberSuspended(id, suspensionId, date, reason, suspensionEndDate,appealDeadline),
    MemberSuspensionAppealed: (id: string, suspensionId: string, appealDate: Date, justification:string) => new MemberSuspensionAppealed(id, suspensionId, appealDate, justification),
    MemberSuspensiosnAppealCancelled: (id: string, suspensionId: string) => new MemberSuspensionAppealCancelled(id, suspensionId),
    MemberSuspensionAppealAccepted: (id: string, suspensionId: string, date: Date, reason: string) => new MembershipSuspensionAppealAccepted(id, suspensionId, date, reason)
}