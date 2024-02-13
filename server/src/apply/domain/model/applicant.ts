import { AggregateRoot } from "src/core/domain";
import { ApplicantId } from "./applicant-id";
import { ApplicationReceived } from "../events/application-received.event";
import { Address } from "src/shared/address";
import { Recommendation } from "./recommendation";
import { CardNumber } from "src/shared/card-number";
import { ApplicantStatus } from "./applicant-status";
import { ApplicationCancelled } from "../events/application-cancelled.event";
import { Money } from "src/shared/money";
import { ApplicantRecommendationsRequested } from "../events/applicant-recommendations-requested.event";
import { ApplicantPaidFee } from "../events/applicant-paid-fee.event";
import { ApplicantRecommendationConfirmed } from "../events/applicant-recommendation-confirmed.event";
import { ApplicationRecommended } from "../events/application-recommended.event";
import { ApplicationNotRecommended } from "../events/application-not-recommended.event";
import { ApplicantRecommendationRefused } from "../events/applicant-recommendation-refused.event";
import { ApplicantAccepted } from "../events/applicant-accepted.event";
import { ApplicantRejected } from "../events/applicant-rejected.event";

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
    private _status: ApplicantStatus;;
    private _requiredFee?: Money;
    private _paidFee?: Money;
    private _paidDate?: Date;
    private _decision?: string;
    private _decisionDate?: Date;
    private _appealDeadline?: Date;

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

    public cancelApplication() {
        this.apply(new ApplicationCancelled(this._applicantId.value));
    }

    public requestRecommendations(requestDate:Date, requiredFee:Money) {
       this.apply(new ApplicantRecommendationsRequested(this._applicantId.value, requestDate, requiredFee));
    }

    public registerFeePayment(paidFee:Money, paidDate:Date) {
        this.apply(new ApplicantPaidFee(this._applicantId.value, paidDate, paidFee));
    }

    public confirmRecommendation(recommendationId:string) {
        this.apply(new ApplicantRecommendationConfirmed(this._applicantId.value, recommendationId));
        //when all confirmed, apply new event
        this.apply(new ApplicationRecommended(this._applicantId.value));
    }

    public refuseRecommendation(recommendationId:string) {
        this.apply(new ApplicantRecommendationRefused(this._applicantId.value, recommendationId));
        this.apply(new ApplicationNotRecommended(this._applicantId.value));
    }

    public acceptApplication(date:Date, decision:string) {
        if(this._status !== ApplicantStatus.AwaitsDecision) {}
        if(this._paidFee !== this._requiredFee) {}
        this.apply(new ApplicantAccepted(this._applicantId.value, date, decision));
    }

    public rejectApplication(date:Date, decision:string, appealDeadline:Date) {
        if(this._status !== ApplicantStatus.AwaitsDecision) {}
        if(this._paidFee !== this._requiredFee) {}
        this.apply(new ApplicantRejected(this._applicantId.value, date, decision, appealDeadline));
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
        this._recommendations = event.recommendations;
        this._status = ApplicantStatus.Received;
    }

    private onApplicationCancelled(event: ApplicationCancelled) {
        this._status = ApplicantStatus.Cancelled;
    }

    private onApplicantRecommendationsRequested(event: ApplicantRecommendationsRequested) {
        this._requiredFee = event.requiredFee;
        this._status = ApplicantStatus.InRecommendation;
        this._recommendations.forEach(r => r.requestRecommendation(event.requestDate));
    }

    private onApplicantPaidFee(event: ApplicantPaidFee) {
        this._paidFee = event.amount;
        this._paidDate = event.paidDate;
    }

    private onApplicantRecommendationConfirmed(event: ApplicantRecommendationConfirmed) {
        const recommendation = this._recommendations.find(r => r.id === event.recommendationId);
        if(recommendation) {
            recommendation.confirmRecommendation();
        }
    }

    private onApplicationRecommended(event: ApplicationRecommended) {
        this._status = ApplicantStatus.AwaitsDecision;
    }

    private onApplicationNotRecommended(event: ApplicationNotRecommended) {

        this._status = ApplicantStatus.Rejected;
    }

    private onApplicantRecommendationRefused(event: ApplicantRecommendationRefused) {
        const recommendation = this._recommendations.find(r => r.id === event.recommendationId);
        if(recommendation) {
            recommendation.refuseRecommendation();
        }
    }

    private onApplicantAccepted(event: ApplicantAccepted) {
        this._status = ApplicantStatus.Accepted;
        this._decision = event.decision;
        this._decisionDate = event.date;
    }

    private onApplicantRejected(event: ApplicantRejected) {
        this._status = ApplicantStatus.Rejected;
        this._decision = event.reason;
        this._decisionDate = event.date;
        this._appealDeadline = event.appealDeadline;
    }

}