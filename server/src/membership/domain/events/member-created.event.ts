import { DomainEvent } from 'src/core/domain';
import { Address } from 'src/shared/address';
import { MembershipFee } from '../model/membership-fee';

export class MemberCreated implements DomainEvent {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly joinDate: Date,
    public readonly birthDate: Date,
    public readonly address: Address,
    public readonly initialFee: MembershipFee,
    public readonly notify: boolean = false,
    public readonly card: number | null = null,
  ) {}
}
