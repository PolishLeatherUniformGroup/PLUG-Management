import { Injectable } from '@nestjs/common';
import { Member } from '../model/member.model';

@Injectable()
export class MemberRepository {
  async save(applicant: Member) {}

  async get(id: string): Promise<Member> {
    throw new Error('Not implemented');
  }

  async getAllActive(): Promise<Member[]> {
    throw new Error('Not implemented');
  }
}
