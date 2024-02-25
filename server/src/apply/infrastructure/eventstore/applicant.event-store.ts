import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { ApplicantId, Applicant } from '../../domain/model';
import { Applicants } from '../../domain/repository';
import { EventStore } from '../../../core/eventstore/eventstore';

@Injectable()
export class ApplicantEventStore implements Applicants {
  constructor(
    private readonly eventStore: EventStore,
    private readonly publisher: EventPublisher,
  ) {}

  async get(id: ApplicantId): Promise<Applicant | null> {
    return this.eventStore.read(Applicant, id.value);
  }

  save(applicant: Applicant): void {
    applicant = this.publisher.mergeObjectContext(applicant);
    applicant
      .getUncommittedEvents()
      .forEach((event) => this.eventStore.publish(event));
    applicant.commit();
  }
}
