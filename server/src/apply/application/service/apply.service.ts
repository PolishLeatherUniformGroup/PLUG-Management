import { CommandBus } from '@nestjs/cqrs';
import { ApplicantId } from '../../domain/model';
import { VerificationService } from 'src/membership/application/service/verification.service';
import { Money } from 'src/shared/money';
import { CancelApplicationCommand } from '../command/cancel-application.command';
import { RequestRecommendations } from '../command/request-recommendations.command';
import { OnEvent } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecommendationView } from '../../infrastructure/read-model/model/recommendation.entity';
import { Injectable, Logger } from '@nestjs/common';
import { EventPayloads } from '../../../event-emitter/event-payloads';

@Injectable()
export class ApplyService {
  private readonly logger = new Logger(ApplyService.name);

  constructor(
    private readonly verificationService: VerificationService,
    @InjectRepository(RecommendationView)
    private readonly recommendationsRepository: Repository<RecommendationView>,
    private readonly commandBus: CommandBus,
  ) { }

  @OnEvent('apply.verify-application')
  async verifyApplication(data: EventPayloads['apply.verify-application']) {
    this.logger.log(`Verifying application ${data.id.toString()}`);
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
      this.logger.log(`Application ${data.id.toString()} is valid`);
      const applicantId = ApplicantId.fromString(data.id);
      const currentAmount = 120*((13-(new Date()).getMonth())/12);
      const command = new RequestRecommendations(
        applicantId,
        new Date(Date.now()),
        Money.create(currentAmount, 'PLN'),
        valid.map((member) => member.email),
        valid.map((member) => member.firstName),
      );
      this.logger.log(`Requesting recommendations for ${command.applicantId.value}`);
      this.commandBus.execute(command);
    } else {
      const command = new CancelApplicationCommand(
        ApplicantId.fromString(data.id),
      );
      this.commandBus.execute(command);
    }
  }
}
