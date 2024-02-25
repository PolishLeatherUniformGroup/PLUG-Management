import { AddressDto } from '../../../shared/dto/address.dto';
import { MembershipFeeDto } from './membership-fee.dto';

export class AddMemberRequestDto {
  card: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  joinDate: Date;
  birthDate: Date;
  address: AddressDto;
  initialFee: MembershipFeeDto;
}
