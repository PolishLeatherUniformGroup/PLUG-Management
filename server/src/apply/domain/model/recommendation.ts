import { CardNumber } from "src/shared/card-number";

export class Recommendation {
    private _id: string;
    private _cardNumber: CardNumber;
    private _requestDate?: Date;
    private _status?:boolean;

    constructor(){

    }

    public static create(id: string, cardNumber: CardNumber): Recommendation {
        const recommendation = new Recommendation();
        recommendation._id = id;
        recommendation._cardNumber = cardNumber;
        return recommendation;
    }
}