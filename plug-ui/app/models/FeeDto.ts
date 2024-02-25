export interface FeeItemDto {
    id: string;
    year: string;
    requiredFee: string;
    paidFee?: string;
    requiredFeeDate: string;
    paidFeeDate?: string;
    currency: string;
}
