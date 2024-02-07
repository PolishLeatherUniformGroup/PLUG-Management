import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiAcceptedResponse, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SendApplicationDto } from "./dtos/send-application.dto";
import { SendApplicationCommand } from "./commands/impl/send-application.command";
import { RequestRecommendationCommand } from "./commands/impl/request-recommendation.command";
import { AccceptApplicationDto } from "./dtos/accept-application.dto";
import { Money } from "./model/money.model";
import { EndorseApplicantDto } from "./dtos/endorse-applicant.dto";
import { EndorseApplicantCommand } from "./commands/impl/endorse-applicant.command";
import { OpposeApplicantDto } from "./dtos/oppose-applicant.dto";
import { OpposeApplicantCommand } from "./commands/impl/oppose-applicant.command";
import { DismissApplicationDto } from "./dtos/dismiss-application.dto";
import { DismissApplicationCommand } from "./commands/impl/dismiss-application.command";
import { RegisterFeePaymnentDto } from "./dtos/register-fee-payment.dto";
import { RegisterFeePaymentCommand } from "./commands/impl/register-fee-payment.command";
import { ApproveApplicantDto } from "./dtos/approve-applicant.dto";
import { ApproveApplicantCommand } from "./commands/impl/approve-applicant.comman";
import { RejectApplicantDto } from "./dtos/reject-applicant.dto";
import { RejectApplicantCommand } from "./commands/impl/reject-applicant.command";

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

    @Post("dismiss-application")
    @ApiOperation({ summary: 'Dismiss Application' })
    @ApiCreatedResponse({description:"Application was dismissed"})
    async sdismissApplication(@Body() dto:DismissApplicationDto){
        let command:DismissApplicationCommand = {...dto}
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

    @Post("endorse-applicant")
    @ApiOperation({ summary: 'Accepts  Application as valid' })
    @ApiCreatedResponse({description:"Application was endorsed by recommender"})
    async endorseApplicant(@Body() dto:EndorseApplicantDto){
        let command:EndorseApplicantCommand = {...dto};
        return this.commandBus.execute(command);
    }

    @Post("oppose-applicant")
    @ApiOperation({ summary: 'Accepts  Application as valid' })
    @ApiCreatedResponse({description:"Application was opposed by recommender"})
    async opposeApplicant(@Body() dto:OpposeApplicantDto){
        let command:OpposeApplicantCommand = {...dto};
        return this.commandBus.execute(command);
    }

    @Post("register-fee-payment")
    @ApiOperation({ summary: 'Accepts  Fee Payment' })
    @ApiCreatedResponse({description:"Application fee was registered."})
    async registerFee(@Body() dto:RegisterFeePaymnentDto){
        let command:RegisterFeePaymentCommand = {...dto, 
            feePaid:new Money(dto.fee.amount,dto.fee.currency)
        };
        return this.commandBus.execute(command);
    }

    @Post("approve-applicant")
    @ApiOperation({ summary: 'Approves  Applicant' })
    @ApiCreatedResponse({description:"Application was approved."})
    async aproveApplicant(@Body() dto:ApproveApplicantDto){
        let command:ApproveApplicantCommand = {...dto};
        return this.commandBus.execute(command);
    }

    @Post("reject-applicant")
    @ApiOperation({ summary: 'Reject  Applicant' })
    @ApiCreatedResponse({description:"Application was rejected."})
    async rejectApplicant(@Body() dto:RejectApplicantDto){
        let command:RejectApplicantCommand = {...dto};
        return this.commandBus.execute(command);
    }

}