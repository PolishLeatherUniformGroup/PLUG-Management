import { Member } from '../model/member';
import { MemberId } from '../model/member-id';

export interface Members {
  get(id: MemberId): Promise<Member | null>;
  save(member: Member): void;
}

export const MEMBERS = 'MEMBERS';
