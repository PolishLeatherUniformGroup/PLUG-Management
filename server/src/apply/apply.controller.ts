import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiAcceptedResponse, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SendApplicationDto } from "./dtos/send-application.dto";
import { SendApplicationCommand } from "./commands/impl/send-application.command";
import { RequestRecommendationCommand } from "./commands/impl/request-recommendation.command";
import { AccceptApplicationDto } from "./dtos/accept-application.dto";
import { Money } from "./model/money.model";

@Controller("apply")
@ApiTags("apply")
export class ApplyController{

    constructor(
        private readonly commandBus:CommandBus,
        private readonly queryBus:QueryBus
        ){}

    @Post("send-application")
    @ApiOperation({ summary: 'Send New Application' })
    @ApiCreatedResponse({description:"Application was received"})
    async sendApplication(@Body() dto:SendApplicationDto){
        let command:SendApplicationCommand = {...dto}
        return this.commandBus.execute(command);
    }

    @Post("accept-application")
    @ApiOperation({ summary: 'Accepts  Application as valid' })
    @ApiCreatedResponse({description:"Application was accepted"})
    async acceptApplication(@Body() dto:AccceptApplicationDto){
        let command:RequestRecommendationCommand = {...dto, 
            date: new Date(Date.now()),
             requiredFee: dto.requiredFee && new Money(dto.requiredFee?.amount,dto.requiredFee?.currency)};
        return this.commandBus.execute(command);
    }

}