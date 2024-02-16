import { UUID } from 'crypto';
import { Id } from '../../../core/domain';

export class MemberId extends Id {
  private constructor(id: string) {
    super(id);
  }

  public static fromString(id: string) {
    return new this(id);
  }
  public static fromUUID(id: UUID) {
    return new this(`mbr-${id.toLowerCase()}`);
  }
}
