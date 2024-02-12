import { AggregateRoot } from "src/core/domain";
import { ApplicantId } from "./applicant-id";
import { ApplicationReceived } from "../events/application-received-event";
import { Address } from "src/shared/address";
import { Recommendation } from "./recommendation";
import { CardNumber } from "src/shared/card-number";

export class Applicant extends AggregateRoot {

    private _applicantId: ApplicantId;

    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _phoneNumber: string;
    private _applyDate: Date;
    private _birthDate: Date;
    private _address: Address;
    private _recommendations: Recommendation[];


    public aggregateId(): string {
        return this._applicantId.value;
    }

    constructor() {
        super();
        this._recommendations = [];
    }

    public static register(
        applicantId: ApplicantId,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        applyDate: Date,
        birthDate: Date,
        address:Address,
        recommenders:string[]=[]): Applicant {
        const applicant = new Applicant();
        const recommendations = recommenders.map((r,i) => {
            return Recommendation.create(`${applicantId.value}-rec-${applicant._recommendations.length+i}`, CardNumber.fromString(r));
        });

        applicant.apply(
            new ApplicationReceived(applicantId.value, firstName, lastName, email, phoneNumber, applyDate,birthDate, address,recommendations)
        );
        return applicant;
    }

    private onApplicationReceived(event: ApplicationReceived) {
        console.log('applying event', event);
        this._applicantId = ApplicantId.fromString(event.id);
        this._firstName = event.firstName;
        this._lastName = event.lastName;
        this._email = event.email;
        this._phoneNumber = event.phoneNumber;
        this._applyDate = event.applyDate;
        this._birthDate = event.birthDate;
        this._address = event.address;
    }

}