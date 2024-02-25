import { AddressDto } from "./AddressDto";

export interface MemberDto {
    id:string;
    card:string;
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    status:number;
    joinedDate:string;
    birthDate:string;
    address:AddressDto;
}