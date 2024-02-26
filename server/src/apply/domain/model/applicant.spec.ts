import e from 'express';
import { Address } from '../../../shared/address';
import { Applicant } from './applicant';
import { ApplicantId } from './applicant-id';
import { Recommendation } from './recommendation';
import {
  ApplicantRecommendationsRequested,
  ApplicationReceived,
  ApplyEvents,
} from '../events';
import { CardNumber } from '../../../shared/card-number';
import { Money } from '../../../shared/money';

it('should create applicant', () => {
  const applicant = Applicant.register(
    ApplicantId.fromString('applicant-id'),
    'first-name',
    'last-name',
    'email',
    'phone-number',
    new Date(),
    new Date(),
    {
      city: 'city',
      country: 'country',
      street: 'street',
      postalCode: 'zip-code',
      state: 'state',
    } as Address,
    ['recommender-1', 'recommender-2'],
  );
  expect(applicant).toBeInstanceOf(Applicant);
  expect(applicant.getUncommittedEvents()).toHaveLength(1);
  expect(applicant.recommendations).toHaveLength(2);
  expect(applicant.recommendations[0]).toBeInstanceOf(Recommendation);
});

it('should recreate application', () => {
  const entity = Reflect.construct(Applicant, []);
  const event0 = new ApplicationReceived(
    'applicant-id',
    'first-name',
    'last-name',
    'email',
    'phone-number',
    new Date(),
    new Date(),
    {
      city: 'city',
      country: 'country',
      street: 'street',
      postalCode: 'zip-code',
      state: 'state',
    } as Address,
    [
      { id: 'rec-1', cardNumber: 'recommender-1' },
      { id: 'rec-2', cardNumber: 'recommender-2' },
    ],
  );
  let serialized0 = JSON.stringify(event0);
  const data0 = JSON.parse(serialized0);
  const event1 = new ApplicantRecommendationsRequested(
    'applicant-id',
    new Date(),
    Money.create(100, 'PLN'),
  );
  const data1 = JSON.parse(JSON.stringify(event1));
  const deserialized0 = ApplyEvents[event0.constructor.name](
    ...Object.values(data0),
  );
  expect(deserialized0).toBeInstanceOf(ApplicationReceived);
  const deserialized1 = ApplyEvents[event1.constructor.name](
    ...Object.values(data1),
  );

  expect(deserialized0.recommendations[0].id).toBe(
    event0.recommendations[0].id,
  );
  entity.loadFromHistory([deserialized0, deserialized1]);
  expect(entity).toBeInstanceOf(Applicant);
  expect(entity.recommendations).toHaveLength(2);
  expect(entity.recommendations[0]).toBeInstanceOf(Recommendation);

  console.log(entity);
});

it('should requestRecomendation', () => {
  const applicant = Applicant.register(
    ApplicantId.fromString('applicant-id'),
    'first-name',
    'last-name',
    'email',
    'phone-number',
    new Date(),
    new Date(),
    {
      city: 'city',
      country: 'country',
      street: 'street',
      postalCode: 'zip-code',
      state: 'state',
    } as Address,
    ['recommender-1', 'recommender-2'],
  );
  applicant.requestRecommendations(
    new Date(),
    Money.create(100, 'PLN'),
    ['recommender-1', 'recommender-2'],
    ['recommender-1', 'recommender-2'],
  );
  expect(applicant.getUncommittedEvents()).toHaveLength(2);
  console.log(applicant);
});
