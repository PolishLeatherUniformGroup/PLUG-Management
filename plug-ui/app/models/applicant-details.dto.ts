export interface ApplicantDetails {
    id:string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber:string;
    status:number;
    applyDate: Date;
    address?: AddressDto;
    fee: FeeDto;
}
export interface AddressDto{
    street: string;
    city: string;
    postalCode: string;
    country: string;
    state?: string;
}
export interface Recommendation{
    card:string;
    status?:boolean
}
export interface FeeDto{
    requiredFee: number;
    paidFee?: number;
    currency: string;
}
