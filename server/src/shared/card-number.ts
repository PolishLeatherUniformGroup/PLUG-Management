import { ValueObject } from '../core/domain/models/value-object';
interface Props {
  value: string;
}

export class CardNumber extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  public static fromString(value: string): CardNumber {
    return new CardNumber({ value });
  }
  public get value(): string {
    return this.props.value;
  }
}
