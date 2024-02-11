import { AddressDto } from 'src/apply/dtos/addres.dto';
import { MoneyDto } from 'src/apply/dtos/money.dto';

export class AddMemberDto {
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;
  public address: AddressDto;
  public birthDate: Date;
  public joinDate: Date;
  public paidFeeAmount: MoneyDto;
  public paidFeeDate: Date;
}
