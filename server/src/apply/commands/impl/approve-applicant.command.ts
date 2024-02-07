export class ApproveApplicantCommand{
    constructor(
        public id:string,
        public date:Date,
        public reason:string,
    ){}
}