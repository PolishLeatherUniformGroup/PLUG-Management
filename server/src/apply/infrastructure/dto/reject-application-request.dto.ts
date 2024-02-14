export class RejectApplicationRequestDto {
  constructor(
    public readonly id: string,
    public readonly decision: string,
    public readonly decisionDate: Date,
  ) {}
}
