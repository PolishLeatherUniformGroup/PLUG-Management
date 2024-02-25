import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetApplicantQuery } from '../get-applicant.query';
import { ApplicantView } from '../../read-model/model/applicant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicantDto } from '../../dto/applicant.dto';

@QueryHandler(GetApplicantQuery)
export class GetApplicantHandler
  implements IQueryHandler<GetApplicantQuery, ApplicantView | null>
{
  constructor(
    @InjectRepository(ApplicantView)
    private readonly applicantRepository: Repository<ApplicantView>,
  ) {}

  async execute(query: GetApplicantQuery): Promise<ApplicantView | null> {
    const q = JSON.parse(JSON.stringify(query.id));
    const applicant = await this.applicantRepository.findOne({
      where: { id: q.id },
    });
    return applicant;
  }
}
