import { AddressDto } from "./AddressDto";
import { FeeDto } from "./FeeDto";
import { Recommendation } from "./Recommendation";

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
    fee: FeeDto;
    recommendations: Recommendation[];
}

