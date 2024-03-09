import { AddressDto } from "./AddressDto";
import { FeeItemDto } from "./FeeDto";
import { Recommendation } from "./Recommendation";
import { ApplicationFeeDto } from "./application-fee.dto";

export interface ApplicantDetails {
    id:string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber:string;
    status:number;
    applyDate: Date;
    birthDate: Date;
    address?: AddressDto;
    fee: ApplicationFeeDto;
    recommendations: Recommendation[];
}

