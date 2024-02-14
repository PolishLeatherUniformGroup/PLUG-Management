import { Address } from 'src/shared/address';
import { MembershipFee } from '../model/membership-fee';
import { MemberCreated } from './member-created.event';
import { MemberCardAssigned } from './member-card-assigned';
import { MemberCard } from '../model/member-card';

export * from './member-created.event';

export { MemberCreated };
export const MembersEvents = {
    MemberCreated: (id: string, firstName: string, lastName: string, email: string, phoneNumber: string, joinDate: Date, birthDate: Date, address: Address, initialFee: MembershipFee) => new MemberCreated(id, firstName, lastName, email, phoneNumber, joinDate, birthDate, address, initialFee),
    MemberCardAssigned: (id: string, cardNumber: MemberCard) => new MemberCardAssigned(id, cardNumber)
}