export class ApproveAppealCommand {
    constructor(
        public id: string,
        public date: Date,
        public reason: string){}
}