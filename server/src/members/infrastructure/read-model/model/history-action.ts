import { CANCELLED } from "dns";

export enum HistoryEnum{
    Joined = 0,
    FeePaid = 1,
    Suspended = 2,
    SuspensionReleased = 3,
    AppealedSuspension = 4,
    SuspensionAppealSuccessful = 5,
    SuspendedAppealFailed = 6,
    Expelled = 7,
    AppealedExpulsion = 8,
    ExpulsionAppealSuccessful = 9,
    ExpulsionAppealFailed = 10,
    Expired = 11,
    Cancelled = 12
}