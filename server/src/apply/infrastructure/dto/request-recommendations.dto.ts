import { MoneyDto } from "./money.dto";

export class RequestRecommendationsDto {
    applicantId: string;
    requestDate: Date;
    requiredFee: MoneyDto;
}