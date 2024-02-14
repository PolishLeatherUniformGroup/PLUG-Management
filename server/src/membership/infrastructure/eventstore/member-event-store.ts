import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import { EventStore } from 'src/core/eventstore/eventstore';
import { Member } from 'src/membership/domain/model/member';
import { MemberId } from 'src/membership/domain/model/member-id';
import { Members } from 'src/membership/domain/repository/members';

@Injectable()
export class MemberEventStore implements Members {
  constructor(
    private readonly eventStore: EventStore,
    private readonly publisher: EventPublisher,
  ) {}

  async get(id: MemberId): Promise<Member | null> {
    return this.eventStore.read(Member, id.value);
  }

  save(member: Member): void {
    member = this.publisher.mergeObjectContext(member);
    member
      .getUncommittedEvents()
      .forEach((event) => this.eventStore.publish(event));
    member.commit();
  }
}
