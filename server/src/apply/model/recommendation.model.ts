export class Recommendation {
  constructor(
    private _id: string,
    private _cardNumber: string,
    private _requestedDate?: Date,
    private _endorsed?: boolean,
  ) {}

  request(requestDate: Date) {
    this._requestedDate = requestDate;
  }

  endorse() {
    this._endorsed = true;
  }

  oppose() {
    this._endorsed = false;
  }

  public get id(): string {
    return this.id;
  }
  public get isEndorsed(): boolean | undefined {
    return this._endorsed;
  }
}
