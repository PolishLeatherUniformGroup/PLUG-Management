import { ValueObject } from "../core/domain";

interface MoneyProps {
  amount: number;
  currency: string;
}

export class Money extends ValueObject<MoneyProps> {
  private constructor(props: MoneyProps) {
    super(props);
  }

  public static create(amount: number, currency: string): Money {
    if (amount < 0) {
      throw new Error('Money cannot be negative');
    }
    return new Money({ amount, currency });
  }

  public get amount(): number {
    return this.props.amount;
  }

  public get currency(): string {
    return this.props.currency;
  }

  public add(money: Money): Money {
    if (this.props.currency !== money.currency) {
      throw new Error('Currencies do not match');
    }
    return Money.create(this.props.amount + money.amount, this.props.currency);
  }

  public subtract(money: Money): Money {
    if (this.props.currency !== money.currency) {
      throw new Error('Currencies do not match');
    }
    return Money.create(this.props.amount - money.amount, this.props.currency);
  }

  public multiply(multiplier: number): Money {
    return Money.create(this.props.amount * multiplier, this.props.currency);
  }

  public divide(divisor: number): Money {
    return Money.create(this.props.amount / divisor, this.props.currency);
  }
}
