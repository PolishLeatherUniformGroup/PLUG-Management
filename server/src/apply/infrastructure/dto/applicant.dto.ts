import { AddressDto } from '../../../shared/dto/address.dto';

export class ApplicantDto {
  public id: string;

  public firstName: string;

  public lastName: string;

  public email: string;

  public phoneNumber: string;

  public applyDate: Date;

  public birthDate: Date;

  public address: AddressDto;

  public status: number;

  public requiredFeeAmount?: number;

  public feeCurrency?: string;

  public paidFeeAmount?: number;

  public feePaidDate?: Date;

  public decision?: string;

  public decisionDate?: Date;

  public appealDeadline?: Date;

  public appealDate?: Date;

  public appealJustification?: string;

  public appealDecision?: string;

  public appealDecisionDate?: Date;
}
