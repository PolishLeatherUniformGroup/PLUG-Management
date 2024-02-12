import { AggregateRoot } from "src/core/domain";
import { ApplicantId } from "./applicant-id";
import { ApplicationReceived } from "../events/application-received-event";
import { Address } from "src/shared/address";

export class Applicant extends AggregateRoot {

    private _applicantId: ApplicantId;

    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _phoneNumber: string;
    private _applyDate: Date;
    private _birthDate: Date;
    private _address: Address;


    public aggregateId(): string {
        return this._applicantId.value;
    }

    constructor() {
        super();
    }

    public static register(
        applicantId: ApplicantId,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        applyDate: Date,
        birthDate: Date,
        address:Address): Applicant {
        const applicant = new Applicant();

        applicant.apply(
            new ApplicationReceived(applicantId.value, firstName, lastName, email, phoneNumber, applyDate,birthDate, address)
        );
        return applicant;
    }

    private onApplicationReceived(event: ApplicationReceived) {
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