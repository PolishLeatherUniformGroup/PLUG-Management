import { CommandBus, IEventHandler, QueryBus } from "@nestjs/cqrs";
import { ApplicationReceived } from "../events";
import { GetMemberByCardQuery } from "src/membership/infrastructure/query/get-member-by-card.query";
import { MemberView } from "src/membership/infrastructure/read-model/model/member.entity";
import { Money } from "src/shared/money";
import { RequestRecommendations } from "src/apply/application/command/request-recommendations.command";
import { ApplicantId } from "../model/applicant-id";
import { CancelApplicationCommand } from "src/apply/application/command/cancel-application.command";

export class ApplicationReceivedHandler implements IEventHandler<ApplicationReceived> {
  constructor(
    private readonly queryBus:QueryBus,
    private readonly commandBus:CommandBus) {}

  async handle(event: ApplicationReceived) {
    const locatedMembers:MemberView[] = [];
    event.recommendations.forEach(async recommendation => {
        const memberQuery = new GetMemberByCardQuery(recommendation.cardNumber.value);
        const member:MemberView = await this.queryBus.execute(memberQuery);
        if (member) {
            locatedMembers.push(member);
        }
    });
    if(locatedMembers.length === event.recommendations.length) {
        const applicantId = ApplicantId.fromString(event.id);
        const command = new RequestRecommendations(
            applicantId,
            new Date(Date.now()),
            Money.create(120,'PLN'),
            locatedMembers.map(member => member.email),
            locatedMembers.map(member => member.firstName));
        this.commandBus.execute(command);
    } else {
        const command = new CancelApplicationCommand(ApplicantId.fromString(event.id));
        this.commandBus.execute(command);
    }
    
  }
}