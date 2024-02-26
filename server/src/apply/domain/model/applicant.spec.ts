import e from "express";
import { Address } from "../../../shared/address";
import { Applicant } from "./applicant";
import { ApplicantId } from "./applicant-id";
import { Recommendation } from "./recommendation";
import { ApplicationReceived, ApplyEvents } from "../events";
import { CardNumber } from "../../../shared/card-number";

it('should create applicant', () => {
    const applicant = Applicant.register(
        ApplicantId.fromString('applicant-id'), 'first-name',
        'last-name', 'email', 'phone-number', new Date(), new Date(), {
            city: 'city',
            country: 'country',
            street: 'street',
            postalCode: 'zip-code',
            state: 'state',
        } as Address, ["recommender-1", "recommender-2"]);
    expect(applicant).toBeInstanceOf(Applicant);
    expect(applicant.getUncommittedEvents()).toHaveLength(1);
    expect(applicant.recommendations).toHaveLength(2);
    expect(applicant.recommendations[0]).toBeInstanceOf(Recommendation);
});

it('should recreate application', () => {
    const entity = Reflect.construct(Applicant, []);
    const event= new ApplicationReceived('applicant-id', 'first-name', 'last-name', 'email', 'phone-number', new Date(), new Date(), {
        city: 'city',
        country: 'country',
        street: 'street',
        postalCode: 'zip-code',
        state: 'state',
    } as Address, [{id: 'rec-1', cardNumber: 'recommender-1'}, {id: 'rec-2', cardNumber: 'recommender-2'}]);
    let serialized= JSON.stringify(event);
    const data = JSON.parse(serialized);
    
    const deserialized = ApplyEvents[event.constructor.name](...Object.values(data));
    expect(deserialized).toBeInstanceOf(ApplicationReceived);

    expect(deserialized.recommendations[0].id).toBe(event.recommendations[0].id);
    entity.loadFromHistory([deserialized]);
    expect(entity).toBeInstanceOf(Applicant);
    expect(entity.recommendations).toHaveLength(2);
    expect(entity.recommendations[0]).toBeInstanceOf(Recommendation);
});