import { ICommand } from '@nestjs/cqrs';
import { MemberId } from '../../domain/model/member-id';
import { Address } from '../../../shared/address';
import { MembershipFee } from '../../domain/model/membership-fee';

export class AddMemberCommand implements ICommand {
  constructor(
    public readonly memberId: MemberId,
    public readonly card: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly joinDate: Date,
    public readonly birthDate: Date,
    public readonly address: Address,
    public readonly initialFee: MembershipFee,
  ) {}
}
