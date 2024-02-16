import { AddressDto } from '../../../shared/dto/address.dto';

export class ApplyRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  applyDate: Date;
  birthDate: Date;
  address: AddressDto;
  recommendersCards: string[];
}
