import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { AddressDto } from './addres.dto';

export class SendApplicationDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: Date;
  address: AddressDto;
  recommenders: string[];
}
