import { AggregateRoot } from "@nestjs/cqrs";
import { Recommendation } from "./recommendation.model";
import { ApplicantStatus } from "./applicant-status.model";
import { Money } from "./money.model";
import { Address } from "./address.model";

export class Applicant extends AggregateRoot{

    private _recommendations:Recommendation[];
    private _status:ApplicantStatus;
    private _requiredFee?:Money;
    private _paidFee?:Money
    private _applyDate:Date;
    private _paidDate?:Date;
    private _approveDate?:Date;
    private _rejectDate?:Date;
    private _appealDeadline?:Date;
    private _appealDate?:Date;
    private _appealDecisioDate?:Date;

    private _rejectionReason?:string;
    private _appealJustification?:string;
    private _appealDecision?:string;

    constructor(
        private _id:string,
        private _firstName:string,
        private _lastName:string,
        private _email:string,
        private _phone:string,
        private _birthDate:Date,
        private _address:Address,
        recommendations:string[]
    ){
        super()
        this._recommendations = recommendations.map((r,i)=>{return new Recommendation(`${_id}_${i}`, r)});
        this._status = ApplicantStatus.Received;
        this._applyDate = new Date(Date.now());
    }

    public get recommendations():Recommendation[]{
        return this.recommendations;
    }


    public dismissApplicant(){
        this._status = ApplicantStatus.InValid;
    }

    public requestRecommendation(requestDate:Date, requiredFee?:Money){
        this._recommendations.forEach((recommendation)=>{
            recommendation.request(requestDate);
        })
        this._requiredFee = requiredFee;
        this._status = ApplicantStatus.InRecommendation;
    }


    public endorseRecommendation(recommendationId:string){
        this.recommendations.find((recommendation)=>{recommendation.id === recommendationId})?.endorse();
        if(this._recommendations.every(recommendation=>recommendation.isEndorsed)){
            this._status = ApplicantStatus.AwaitsDecision;
        }
    }

    public opposeRecommendation(recommendationId:string){
        this.recommendations.find((recommendation)=>{recommendation.id === recommendationId})?.oppose();
        this._status = ApplicantStatus.NotRecommended;
    }

    public registerFeePayment(paidFee:Money, paidDate:Date){
        this._paidDate = paidDate;
        this._paidFee = paidFee;
    }

    public approve(approvDate:Date){
        this._approveDate = approvDate;
        this._status = ApplicantStatus.Approved;
    }

    public reject(rejectDate:Date, reason:string, appealDeadline:Date ){
        this._rejectDate = rejectDate;
        this._rejectionReason =reason;
        this._appealDeadline = appealDeadline;
    }

    public appeal(appealDate:Date, justification:string){
        this._appealDate = appealDate;
        this._appealJustification = justification;
        if(this._appealDeadline && this._appealDeadline > appealDate){
            this._status = ApplicantStatus.Appealed;
        }else{
            this._status = ApplicantStatus.AppealInvalid;
        }
    }

    public approveAppeal(appealApproveDate:Date, decision:string){
        this._status  = ApplicantStatus.AppealApproved;
        this._appealDecisioDate = appealApproveDate;
        this._appealDecision = decision;
    }
    
    public rejectAppeal(appealRejectDate:Date, decision:string){
        this._status  = ApplicantStatus.AppealRejected;
        this._appealDecisioDate = appealRejectDate;
        this._appealDecision = decision;
    }

}

