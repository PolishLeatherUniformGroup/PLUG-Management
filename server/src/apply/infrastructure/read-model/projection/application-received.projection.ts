import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicationReceived } from "src/apply/domain/events/application-received-event";
import { ApplicantView } from "../model/applicant.entity";
import { Repository } from "typeorm";
import { RecommendationView } from "../model/recommendation.entity";

@EventsHandler(ApplicationReceived)
export class ApplicationReceivedProjection implements IEventHandler<ApplicationReceived>{
    constructor(
        @InjectRepository(ApplicantView) private readonly applicantRepository: Repository<ApplicantView>,
        @InjectRepository(RecommendationView) private readonly recommendationRepository: Repository<RecommendationView>
    ) { }
    async handle(event: ApplicationReceived) {
        try{
        const entity = new ApplicantView();
        entity.id = event.id;
        entity.firstName = event.firstName;
        entity.lastName = event.lastName;
        entity.email = event.email;
        entity.phoneNumber = event.phoneNumber;
        entity.applyDate = event.applyDate;
        entity.birthDate = event.birthDate;
        entity.addressCountry = event.address.country;
        entity.addressCity = event.address.city;
        entity.addressStreet = event.address.street;
        entity.addressPostalCode = event.address.postalCode;
        entity.addressState = event.address.state;
        entity.recommendations = event.recommendations.map(r=>{
            const recommendation = new RecommendationView();
            recommendation.id = r.id;
            recommendation.cardNumber = r.cardNumber.value;
            return recommendation;
        });
        await this.applicantRepository.save(entity);
        entity.recommendations.forEach(async r=>{
            r.applicant = entity;
            await this.recommendationRepository.save(r);
        });
        }catch(e){
            console.log('error: ', e)
        }
    }
}