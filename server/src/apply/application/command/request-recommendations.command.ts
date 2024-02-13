import { ICommand } from "@nestjs/cqrs";
import { ApplicantId } from "src/apply/domain/model";
import { Money } from "src/shared/money";

export class RequestRecommendations implements ICommand{
  constructor(
    public readonly applicantId: ApplicantId,
    public readonly requestDate:Date,
    public readonly requiredFee:Money) {}
}