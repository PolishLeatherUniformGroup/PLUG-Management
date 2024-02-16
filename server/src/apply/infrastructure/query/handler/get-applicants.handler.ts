import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetApplicantsQuery } from '../get-applicants.query';
import { ApplicantView } from '../../read-model/model/applicant.entity';
import { ApplicantDto } from '../../dto/applicant.dto';

@QueryHandler(GetApplicantsQuery)
export class GetApplicantsHandler implements IQueryHandler<GetApplicantsQuery> {
  constructor(
    @InjectRepository(ApplicantView)
    private readonly repository: Repository<ApplicantView>,
  ) {}

  async execute(query: GetApplicantsQuery): Promise<ApplicantDto[]> {
    query;
    const applicants = await this.repository.find();

    return applicants.map((applicant) => {
      return { ...applicant } as ApplicantDto;
    });
  }
}
