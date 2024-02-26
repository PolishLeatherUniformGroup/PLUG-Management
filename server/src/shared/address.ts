import { ValueObject } from '../core/domain';
import { AddressDto } from './dto/address.dto';

interface Props {
  country: string;
  city: string;
  postalCode: string;
  street: string;
  state?: string;
}

export class Address extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static fromDto(address: AddressDto): Address {
    return new Address({
      country: address.country,
      city: address.city,
      postalCode: address.postalCode,
      street: address.street,
      state: address.state,
    });
  }

  public static create(props: Props): Address {
    return new Address(props);
  }

  get country(): string {
    return this.props.country;
  }

  get city(): string {
    return this.props.city;
  }

  get postalCode(): string {
    return this.props.postalCode;
  }

  get street(): string {
    return this.props.street;
  }

  get state(): string | undefined {
    return this.props.state;
  }
}
