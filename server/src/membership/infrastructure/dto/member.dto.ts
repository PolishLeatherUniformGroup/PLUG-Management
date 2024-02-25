import { AddressDto } from "../../../shared/dto/address.dto";

export class MemberDto {
  public id: string;
  public card: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;
  public address: AddressDto;
  public joinedDate: Date;
  public birthDate: Date;
  public status: number;
}
