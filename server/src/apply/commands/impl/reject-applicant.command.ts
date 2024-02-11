export class RejectApplicantCommand {
  constructor(
    public id: string,
    public date: Date,
    public reason: string,
  ) {}
}
