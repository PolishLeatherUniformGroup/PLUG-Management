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
export interface AddressDto{
    street: string;
    city: string;
    postalCode: string;
    country: string;
    state?: string;
}
export interface Recommendation{
    cardNumber:string;
    status?:boolean
}
export interface FeeDto{
    requiredFee: number;
    paidFee?: number;
    currency: string;
}
