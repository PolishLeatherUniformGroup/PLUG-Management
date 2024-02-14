import { AddressDto } from "src/shared/dto/address.dto";
import { MembershipFeeDto } from "./membership-fee.dto";

export class CreateMemberRequestDto{
  firstName: string;
  lastName: string;
  email: string
  phoneNumber: string;
  joinDate: Date;
  birthDate: Date;
  address: AddressDto;
  initialFee: MembershipFeeDto;
}