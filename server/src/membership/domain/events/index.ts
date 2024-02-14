import { Address } from 'src/shared/address';
import { MembershipFee } from '../model/membership-fee';
import { MemberCreated } from './member-created.event';
import { MemberCardAssigned } from './member-card-assigned';
import { MemberCard } from '../model/member-card';
import { MembershipFeeRequested } from './membership-fee-requested.event';
import { Money } from 'src/shared/money';
import { MembershipFeePaid } from './membership-fee-paid.event';
import { MemberTypeChanged } from './member-type-changed.event';
import { MemberType } from '../model/member-type';

export * from './member-created.event';
export * from './member-card-assigned';
export * from './membership-fee-requested.event';
export * from './membership-fee-paid.event';


export { MemberCreated, MemberCardAssigned, MembershipFeeRequested, MembershipFeePaid};
export const MembersEvents = {
    MemberCreated: (id: string, firstName: string, lastName: string, email: string, phoneNumber: string, joinDate: Date, birthDate: Date, address: Address, initialFee: MembershipFee) => new MemberCreated(id, firstName, lastName, email, phoneNumber, joinDate, birthDate, address, initialFee),
    MemberCardAssigned: (id: string, cardNumber: MemberCard) => new MemberCardAssigned(id, cardNumber),
    MembershipFeeRequested: (id: string, year: number, amount: Money, dueDate: Date) => new MembershipFeeRequested(id, year, amount, dueDate),
    MembershipFeePaid: (id: string, feeId: string, amount: Money, paidDate: Date) => new MembershipFeePaid(id, feeId, amount, paidDate),
    MemberTypeChanged: (id: string, type: MemberType) => new MemberTypeChanged(id, type)
}