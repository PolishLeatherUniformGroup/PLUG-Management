import { IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantView } from '../model/applicant.entity';
import { Repository } from 'typeorm';
import { ApplicantAccepted } from '../../../domain/events';
import { ApplicantIdNotFound } from '../../../domain/exception/applicant-id-not-found.error';
import { ApplicantId, ApplicantStatus } from '../../../domain/model';
import { IViewUpdater } from '../../../../eventstore/view/interfaces/view-updater';
import { TypedEventEmitter } from '../../../../event-emitter/typed-event-emmitter';

export class ApplicationAcceptedProjection
  implements IViewUpdater<ApplicantAccepted>
{
  constructor(
    @InjectRepository(ApplicantView)
    private readonly repository: Repository<ApplicantView>,
    private readonly emitter: TypedEventEmitter,
  ) {}

  public async handle(event: ApplicantAccepted): Promise<void> {
    const application = await this.repository.findOne({
      where: { applicantId: event.id },
    });
    if (!application)
      throw ApplicantIdNotFound.withApplicantId(
        ApplicantId.fromString(event.id),
      );
    application.status = ApplicantStatus.Accepted;
    application.decision = event.decision;
    application.decisionDate = event.date;
    await this.repository.save(application);
    await this.emitter.emitAsync('apply.application-approved', {
      name: application.firstName,
      email: application.email,
    });
    await this.emitter.emitAsync('system.application-approved', {
      firstName: application.firstName,
      lastName: application.lastName,
      email: application.email,
      phoneNumber: application.phoneNumber,
      joinDate: application.decisionDate,
      birthDate: application.birthDate,
      address: {
        street: application.addressStreet,
        city: application.addressCity,
        postalCode: application.addressPostalCode,
        country: application.addressCountry,
        state: application.addressState,
      },
      initialFee: {
        year: application.applyDate.getFullYear(),
        dueAmount: {
          ammount: application.requiredFeeAmount,
          currency: application.feeCurrency,
        },
        dueDate: application.feePaidDate,
        paidAmount: {
          ammount: application.paidFeeAmount,
          currency: application.feeCurrency,
        },
        paidDate: application.feePaidDate,
      },
    });
  }
}
