import { AddressDto } from 'src/shared/dto/address.dto';

export class MemberDto {
  public id: string;
  public card: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;
  public address: AddressDto;
  public status: number;
}
