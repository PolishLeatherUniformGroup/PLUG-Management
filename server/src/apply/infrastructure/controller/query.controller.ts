import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { ApplicantDto } from '../dto/applicant.dto';
import { GetApplicantQuery } from '../query/get-applicant.query';
import { RecommendationsDto } from '../dto/recommendations.dto';
import { GetApplicantRecommendationsQuery } from '../query/get-applicant-recommendations.query';
import { ApplicantsDto } from '../dto/applicants.dto';
import { GetApplicantsQuery } from '../query/get-applicants.query';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/auth/jwt.guard';
import { ApplicantView } from '../read-model/model/applicant.entity';
import { AddressDto } from 'src/shared/dto/address.dto';

@Controller('apply')
@ApiTags('apply')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class QueryController {
  constructor(private readonly queryBus: QueryBus) {}
  @Get('applicants')
  @ApiOperation({ summary: 'Get all Applicants.' })
  @ApiResponse({ status: 200, description: 'Applicantss', type: ApplicantsDto })
  async getApplications(): Promise<ApplicantsDto> {
    const query = new GetApplicantsQuery();

    const applicants = await this.queryBus.execute(query);
    return {
      data: applicants,
    } as ApplicantsDto;
  }

  @Get('applicants/:id')
  @ApiOperation({ summary: 'Get Applicant by Id.' })
  @ApiResponse({ status: 200, description: 'Applicant', type: ApplicantDto })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Applicant Id',
    type: 'string',
  })

  async getApplication(@Param() id: string): Promise<ApplicantDto | null> {
    const query = new GetApplicantQuery(id);
    const applicant:ApplicantView = await this.queryBus.execute(query);
    if (!applicant) {
      throw new NotFoundException();
    }
    return {
      ...applicant,
      address: {
        country: applicant.addressCountry,
        city: applicant.addressCity,
        street: applicant.addressStreet,
        postalCode: applicant.addressPostalCode,
        state: applicant.addressState,
      } as AddressDto,
    }as ApplicantDto;
  }

  @Get('applicants/:id/recommendations')
  @ApiOperation({
    summary: 'Get Applicant Recommendations  by  applicants Id.',
  })
  @ApiResponse({
    status: 200,
    description: 'Recommendations',
    type: RecommendationsDto,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Applicant Id',
    type: 'string',
  })
  async getApplicationRecommendations(
    @Param() id: string,
  ): Promise<RecommendationsDto> {
    const query = new GetApplicantRecommendationsQuery(id);
    const recommendations = await this.queryBus.execute(query);
    return { data: recommendations } as RecommendationsDto;
  }
}
