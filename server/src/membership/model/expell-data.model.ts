export class ExpellData {
  private _id: string;
  private _date: Date;
  private _reason: string;
  private _appealDeadline: Date;

  private _appealDate?: Date;
  private _appealReason?: string;
  private _appealDecisionDate?: Date;
  private _appealDecision?: string;

  constructor(id: string, date: Date, reason: string, appealDeadline: Date) {
    this._id = id;
    this._date = date;
    this._reason = reason;
    this._appealDate = appealDeadline;
  }

  public appeal(date: Date, reason: string) {
    this._appealDate = date;
    this._appealReason = reason;
  }

  public approveAppeal(date: Date, reason: string) {
    this._appealDecisionDate = date;
    this._appealDecision = reason;
  }

  public rejectAppeal(date: Date, reason: string) {
    this._appealDecisionDate = date;
    this._appealDecision = reason;
  }
}
