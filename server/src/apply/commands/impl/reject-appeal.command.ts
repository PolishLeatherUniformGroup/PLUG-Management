export class RejectAppealCommand {
  constructor(
    public id: string,
    public date: Date,
    public reason: string,
  ) {}
}
