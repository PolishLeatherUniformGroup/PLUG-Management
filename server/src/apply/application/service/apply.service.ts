import { CommandBus } from '@nestjs/cqrs';
import { ApplicantId } from '../../domain/model';
import { VerificationService } from 'src/membership/application/service/verification.service';
import { Money } from 'src/shared/money';
import { CancelApplicationCommand } from '../command/cancel-application.command';
import { RequestRecommendationsCommand } from '../command/request-recommendations.command';
import { OnEvent } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecommendationView } from '../../infrastructure/read-model/model/recommendation.entity';
import { Injectable, Logger } from '@nestjs/common';
import { EventPayloads } from '../../../event-emitter/event-payloads';
import { MemberView } from '../../../membership/infrastructure/read-model/model/member.entity';

@Injectable()
export class ApplyService {
  private readonly logger = new Logger(ApplyService.name);

  constructor(
    private readonly verificationService: VerificationService,
    @InjectRepository(RecommendationView)
    private readonly recommendationsRepository: Repository<RecommendationView>,
    private readonly commandBus: CommandBus,
  ) {}

  @OnEvent('apply.verify-application')
  async verifyApplication(data: EventPayloads['apply.verify-application']) {
    const valid = await this.verifyRecommendations(data.id);

    if (valid.length == data.rcomendationsCount) {
      this.logger.log(`1. Application ${data.id.toString()} is valid`);
      const applicantId = ApplicantId.fromString(data.id);
      const currentAmount = 120 * ((13 - new Date().getMonth()) / 12);
      const command = new RequestRecommendationsCommand(
        applicantId,
        new Date(Date.now()),
        Money.create(currentAmount, 'PLN'),
      );
      this.logger.log(
        `2. Requesting recommendations for ${command.applicantId.value}`,
      );
      this.commandBus.execute(command);
    } else {
      const command = new CancelApplicationCommand(
        ApplicantId.fromString(data.id),
      );
      this.commandBus.execute(command);
    }
  }

  private async verifyRecommendations(
    applicationId: string,
  ): Promise<MemberView[]> {
    this.logger.log(`X. Verifying application ${applicationId}`);
    const recommendations = await this.recommendationsRepository.find({
      where: { applicant: { applicantId: applicationId } },
    });
    console.log('recommendations', recommendations);
    const cards: string[] = recommendations.map((rec) => {
      console.log('checking member', rec.cardNumber);
      return rec.cardNumber;
    });

    const valid = await this.verificationService.verifyCardNumbers(
      cards.map((card) => card.toString()),
    );
    return valid;
  }
}
