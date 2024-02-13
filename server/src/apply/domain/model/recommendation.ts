import { CardNumber } from "src/shared/card-number";

export class Recommendation {
   
    
    
    private _id: string;
    private _cardNumber: CardNumber;
    private _requestDate?: Date;
    private _status?: boolean;
  

    constructor() {

    }

    public static create(id: string, cardNumber: CardNumber): Recommendation {
        const recommendation = new Recommendation();
        recommendation._id = id;
        recommendation._cardNumber = cardNumber;
        return recommendation;
    }

    requestRecommendation(requestDate: Date): void {
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