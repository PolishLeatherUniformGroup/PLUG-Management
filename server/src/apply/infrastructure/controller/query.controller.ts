import { Body, Controller, Get, Param } from "@nestjs/common";
import { ApplyRequestDto } from "../dto/apply-request.dto";
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from "@nestjs/swagger";
import {QueryBus } from "@nestjs/cqrs";

@Controller('query')
@ApiTags('apply')
export class QueryController{
    constructor(
        private readonly queryBus: QueryBus
    ){}
}