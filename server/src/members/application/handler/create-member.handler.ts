import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMemberCommand } from '../command/create-member.command';
import { MEMBERS, Members } from 'src/members/domain/repository/members';
import { Inject } from '@nestjs/common';
import { Member } from 'src/members/domain/model/member';

@CommandHandler(CreateMemberCommand)
export class CreateMemberCommandHandler implements ICommandHandler<CreateMemberCommand> {
    constructor(
        @Inject(MEMBERS)private readonly members: Members) {}

    async execute(command: CreateMemberCommand): Promise<void> {
        try{
            const member = Member.create(
                command.memberId,
                command.firstName,
                command.lastName,
                command.email,
                command.phoneNumber,
                command.joinDate,
                command.birthDate,
                command.address,
                command.initialFee
            );
            this.members.save(member);
        }catch(error){
            console.log(error);
        }
    }
}