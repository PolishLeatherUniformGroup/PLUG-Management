import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicantView } from "../model/applicant.entity";
import { Repository } from "typeorm";
import { ApplicantIdNotFound } from "src/apply/domain/exception/applicant-id-not-found.error";
import { ApplicantId, ApplicantStatus } from "src/apply/domain/model";
import { ApplicantRejectionAppealCancelled } from "src/apply/domain/events/applicant-rejection-appeal-cancelled.event";

@EventsHandler(ApplicantRejectionAppealCancelled)
export class ApplicantRejectionAppealCancelledProjection implements IEventHandler<ApplicantRejectionAppealCancelled> {
    constructor(
        @InjectRepository(ApplicantView) private readonly repository: Repository<ApplicantView>,
    ) { }

    public async handle(event: ApplicantRejectionAppealCancelled): Promise<void> {
        const application = await this.repository.findOne({where :{id:event.id}});
        if(!application) throw ApplicantIdNotFound.withApplicantId(ApplicantId.fromString(event.id));
        application.appealJustification = event.justification;
        application.appealDate = event.appealDate;
        application.status = ApplicantStatus.AppealInvalid;
        await this.repository.save(application);
    }
}