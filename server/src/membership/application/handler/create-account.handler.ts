import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreatAccountCommand } from "../command/create-account.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MemberView } from "../../infrastructure/read-model/model/member.entity";
import { MembershipAuthService } from "../../../auth/auth.service";

@CommandHandler(CreatAccountCommand)
export class CreateAccountHandler implements ICommandHandler<CreatAccountCommand>{
    constructor( @InjectRepository(MemberView)
    private readonly memberRepository: Repository<MemberView>,
    private readonly memberService: MembershipAuthService){}

    async execute(command: CreatAccountCommand): Promise<any> {
        const member = await this.memberRepository.findOne({where: {cardNumber: command.card}});
        if(!member){
            throw new Error();
        }

        await this.memberService.createMemberAccount(
            member.firstName,
            member.lastName,
            member.email,
            member.phoneNumber,
            member.cardNumber
        );
    }

}