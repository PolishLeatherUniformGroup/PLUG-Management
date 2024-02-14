import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetApplicantQuery } from '../get-applicant.query';
import { ApplicantView } from '../../read-model/model/applicant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicantDto } from '../../dto/applicant.dto';

@QueryHandler(GetApplicantQuery)
export class GetApplicantHandler implements IQueryHandler<GetApplicantQuery> {
  constructor(
    @InjectRepository(ApplicantView)
    private readonly applicantRepository: Repository<ApplicantView>,
  ) {}

  async execute(query: GetApplicantQuery): Promise<ApplicantDto> {
    const q = JSON.parse(JSON.stringify(query.id));
    console.log('Query:', q);
    const applicant = await this.applicantRepository.findOne({
      where: { id: q.id },
    });
    console.log('Applicant:', applicant);
    return { ...applicant } as ApplicantDto;
  }
}
