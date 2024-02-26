import { AddressDto } from '../../../shared/dto/address.dto';

export class ApplyRequestDto {
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;
  public applyDate: Date;
  public birthDate: Date;
  public address: AddressDto;
  public recommendersCards: string[];
}
