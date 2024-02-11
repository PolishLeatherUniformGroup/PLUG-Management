import { CommandBus, EventPublisher, EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { randomUUID } from "crypto";
import { ApplicationApprovedEvent } from "src/apply/events/impl/application-approved.event";
import { AddMemberCommand } from "src/membership/commands/impl/add-member.command";
import { Member } from "src/membership/model/member.model";
import { MemberRepository } from "src/membership/repository/member.repository";

@EventsHandler(ApplicationApprovedEvent)
export class ApplicationApprovedHandler implements IEventHandler<ApplicationApprovedEvent>{
    constructor(private readonly commandBus:CommandBus){}
    handle(event: ApplicationApprovedEvent) {
       const command = new AddMemberCommand(
              event.firstName,
              event.lastName,
              event.email,
              event.phone,
              event.address,
              event.birthDate,
              event.decisionDate,
              event.paidFee,
              event.feePaidDate
       );

       this.commandBus.execute(command);
    }

}