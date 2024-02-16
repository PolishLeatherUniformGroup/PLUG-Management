import { DomainEvent } from 'src/core/domain';
import { Address } from 'src/shared/address';
import { Recommendation } from '../model/recommendation';

export class ApplicationReceived implements DomainEvent {
  public constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly applyDate: Date,
    public readonly birthDate: Date,
    public readonly address: Address,
    public readonly recommendations: Recommendation[],
  ) {}
}
