import { CommandBus } from '@nestjs/cqrs';
import { ApplicantId } from '../../domain/model';
import { VerificationService } from 'src/membership/application/service/verification.service';
import { Money } from 'src/shared/money';
import { CancelApplicationCommand } from '../command/cancel-application.command';
import { RequestRecommendations } from '../command/request-recommendations.command';
import { OnEvent } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventPayloads } from 'src/event-emitter/event-payloads';
import { RecommendationView } from '../../infrastructure/read-model/model/recommendation.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplyService {
  constructor(
    private readonly verificationService: VerificationService,
    @InjectRepository(RecommendationView)
    private readonly recommendationsRepository: Repository<RecommendationView>,
    private readonly commandBus: CommandBus,
  ) {}

  @OnEvent('apply.verify-application')
  async verifyApplication(data: EventPayloads['apply.verify-application']) {
    const recommendations = await this.recommendationsRepository.find({
      where: { applicant: { id: data.id } },
    });

    const cards: string[] = recommendations.map((rec) => rec.cardNumber);
    const valid = await this.verificationService.verifyCardNumbers(
      cards.map((card) => card.toString()),
    );
    if (
      valid.length == recommendations.length &&
      valid.length == data.rcomendationsCount
    ) {
      const applicantId = ApplicantId.fromString(data.id);
      const command = new RequestRecommendations(
        applicantId,
        new Date(Date.now()),
        Money.create(120, 'PLN'),
        valid.map((member) => member.email),
        valid.map((member) => member.firstName),
      );
      this.commandBus.execute(command);
    } else {
      const command = new CancelApplicationCommand(
        ApplicantId.fromString(data.id),
      );
      this.commandBus.execute(command);
    }
  }
}
