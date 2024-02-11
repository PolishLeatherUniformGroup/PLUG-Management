import { Injectable } from '@nestjs/common';
import { Applicant } from '../model/applicant.model';

@Injectable()
export class ApplicantRepository {
  async save(applicant: Applicant) {}

  async get(id: string): Promise<Applicant> {
    throw new Error('Not implemented');
  }
}
