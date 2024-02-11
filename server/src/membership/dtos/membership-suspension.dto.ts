export class MembershipSuspensionDto {
  memberId: string;
  reason: string;
  decisionDate: Date;
  suspendUntil: Date;
}
