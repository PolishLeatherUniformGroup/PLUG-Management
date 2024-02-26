import { CardNumber } from '../../../shared/card-number';
import { Recommendation } from './recommendation';

it('recomandation can be created', () => {
  const recomandation = Recommendation.create(
    'id',
    CardNumber.fromString('1234567890123456'),
  );
  expect(recomandation).toBeDefined();
  expect(recomandation.id).toBe('id');
  expect(recomandation.cardNumber).toBeInstanceOf(CardNumber);
});
