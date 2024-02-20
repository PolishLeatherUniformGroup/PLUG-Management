import { MailerService } from '@nestjs-modules/mailer';
import { EventPayloads } from '../event-emitter/event-payloads';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
interface Email {
    to: string;
    data: any;
  }

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    @OnEvent('apply.application-received')
    async applyConfirmation(data:EventPayloads['apply.application-received']){
        const {email, name} = data;

        const subject = `Wniosek członkowski PLUG`;
        await this.mailerService.sendMail({
            to: email,
            subject,
            template: './apply-confirmation',
            context: {
              name,
            },
          });
    }
}
