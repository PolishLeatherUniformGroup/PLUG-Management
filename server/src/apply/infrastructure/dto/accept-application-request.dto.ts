export class AcceptApplicationRequestDto {
    constructor(
        public readonly id: string,
        public readonly decision: string,
        public readonly decisionDate: Date,
    ) {}
}