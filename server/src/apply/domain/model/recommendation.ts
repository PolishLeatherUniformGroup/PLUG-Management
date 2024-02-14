import { CardNumber } from "src/shared/card-number";

export class Recommendation {
    
    private _id: string;
    private _cardNumber: CardNumber;
    private _requestDate?: Date;
    private _status?: boolean;

    constructor(json:any) {
        this._id = json._id;
        this._cardNumber = json._cardNumber;
        this._requestDate = json._requestDate;
        this._status = json._status;
    }

    public static create(id: string, cardNumber: CardNumber): Recommendation {
        const recommendation = new Recommendation({ _id: id, _cardNumber: cardNumber});
        return recommendation;
    }

    public requestRecommendation(requestDate: Date) {
        this._requestDate = requestDate;
    }

    confirmRecommendation() {
        this._status = true;
    }
    refuseRecommendation() {
       this._status = false;
    }
    public get id(): string {
        return this._id;
    }
    public get cardNumber(): CardNumber {
        return this._cardNumber;
    }
    public get requestDate(): Date | undefined {
        return this._requestDate;
    }
    public get status(): boolean | undefined {
        return this._status;
    }
}