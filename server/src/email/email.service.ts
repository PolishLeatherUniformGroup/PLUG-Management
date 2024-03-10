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
  async applyConfirmation(data: EventPayloads['apply.application-received']) {
    const { email, name } = data;
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

  @OnEvent('apply.request-recomendation')
  async requestRecommendation(
    data: EventPayloads['apply.request-recomendation'],
  ) {
    const { email, name } = data;
    const subject = `Kandydat do oczekuje na twoją rekomendacje`;
    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './request-recommendation',
      context: {
        name,
      },
    });
  }

  @OnEvent('apply.request-fee-payment')
  async requestApplyFeePayment(
    data: EventPayloads['apply.request-fee-payment'],
  ) {
    const { email } = data;
    const subject = `Informacjo dotyczaca wniosku członkowskiego PLUG`;
    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './apply-request-fee-payment',
      context: {
        ...data,
      },
    });
  }

  @OnEvent('apply.application-cancelled')
  async applicationCancelled(
    data: EventPayloads['apply.application-cancelled'],
  ) {
    const { email, name } = data;
    const subject = `Informacjo dotyczaca wniosku członkowskiego PLUG`;
    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './application-cancelled',
      context: {
        name,
      },
    });
  }

  @OnEvent('apply.application-not-recommended')
  async applicationNotRecommended(
    data: EventPayloads['apply.application-not-recommended'],
  ) {
    const { email, name } = data;
    const subject = `Informacjo dotyczaca wniosku członkowskiego PLUG`;
    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './recommendation-refused',
      context: {
        name,
      },
    });
  }

  @OnEvent('apply.application-approved')
  async applicationAccepted(data: EventPayloads['apply.application-approved']) {
    const { email, name } = data;
    const subject = `Informacja o przyjęciu do Stowarzyszenia PLUG`;
    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './application-approved',
      context: {
        name,
      },
    });
  }

  @OnEvent('apply.application-rejected')
  async applicationRejected(data: EventPayloads['apply.application-rejected']) {
    const { email } = data;
    const subject = `Informacja o odrzuceniu wniosku o dołączenie do Stowarzyszenia PLUG`;
    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './application-rejected',
      context: {
        ...data,
      },
    });
  }

  @OnEvent('apply.payment-received')
  async confirmApplyFeePayment(data: EventPayloads['apply.payment-received']) {
    const { email, name } = data;
    const subject = `Potwierdzenie opłacenia wniosku członkowskiego PLUG`;
    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './apply-payment-received',
      context: {
        name,
      },
    });
  }

  @OnEvent('apply.application-appealed')
  async applicationRejectionAppealReceived(
    data: EventPayloads['apply.application-appealed'],
  ) {
    const { email, name } = data;
    const subject = `Potwierdzenie  przyjęcia odwołania o odrzuceniu PLUG`;
    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './apply-rejection-appeal-received',
      context: {
        name,
      },
    });
  }

  @OnEvent('apply.application-appeal-cancelled')
  async applicationRejectionAppealCancelled(
    data: EventPayloads['apply.application-appeal-cancelled'],
  ) {
    const { email, name } = data;
    const subject = `Potwierdzenie  przyjęcia odwołania o odrzuceniu PLUG`;
    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './apply-rejection-appeal-cancelled',
      context: {
        name,
      },
    });
  }

  @OnEvent('apply.application-appeal-approved')
  async applicationRejectionAppealApproved(
    data: EventPayloads['apply.application-appeal-approved'],
  ) {
    const { email, name } = data;
    const subject = `Informacja o odowłaniu od negatywnej decyzji o przyjęciu do stowarzyszenia PLUG`;
    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './apply-rejection-appeal-approved',
      context: {
        name,
      },
    });
  }

  @OnEvent('apply.application-appeal-rejected')
  async applicationRejectionAppealRejected(
    data: EventPayloads['apply.application-appeal-rejected'],
  ) {
    const { email, name } = data;
    const subject = `Informacja o odowłaniu od negatywnej decyzji o przyjęciu do stowarzyszenia PLUG`;
    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './apply-rejection-appeal-rejected',
      context: {
        name,
      },
    });
  }
}
