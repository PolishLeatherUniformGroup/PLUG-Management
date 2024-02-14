import { MoneyDto } from "../../../shared/dto/money.dto";

export class RequestRecommendationsDto {
    applicantId: string;
    requestDate: Date;
    requiredFee: MoneyDto;
}