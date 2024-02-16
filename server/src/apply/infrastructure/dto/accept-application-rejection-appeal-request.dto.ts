export class AcceptApplicationRejectionAppealRequestDto {
  constructor(
    public readonly id: string,
    public readonly decision: string,
    public readonly decisionDate: Date,
  ) {}
}
