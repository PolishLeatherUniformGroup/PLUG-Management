import { Body, Controller, Get, Param } from "@nestjs/common";
import { ApplyRequestDto } from "../dto/apply-request.dto";
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from "@nestjs/swagger";
import {QueryBus } from "@nestjs/cqrs";
import { ApplicantDto } from "../dto/applicant.dto";
import { GetApplicantQuery } from "../query/get-applicant.query";


@Controller('query')
@ApiTags('apply')
export class QueryController{
    constructor(
        private readonly queryBus: QueryBus
    ){}

    @Get('applicants/:id')
    @ApiOperation({ summary: 'Get Applicant by Id.' })
    @ApiResponse({ status: 200, description: 'Applicant', type: ApplicantDto})
    @ApiParam({ name: 'id', required: true, description: 'Applicant Id', type: 'string'})
    async getApplication(@Param() id:string):Promise<ApplicantDto | null> {
        const query = new GetApplicantQuery(id);
        console.log('Async GetApplicantQuery...',query);
        const applicant = await this.queryBus.execute(query);
        return applicant;
    }

    @Get('applicants/:id/recommendations')
    @ApiOperation({ summary: 'Get Applicant Recommendations  by  applicants Id.' })
    @ApiResponse({ status: 200, description: 'Recommendations', type: RecommendationView})
    @ApiParam({ name: 'id', required: true, description: 'Applicant Id', type: 'string'})
    async getApplicationRecommendations(@Param() id:string):Promise<RecommendationView[]> {
        return [];
    }
}
}