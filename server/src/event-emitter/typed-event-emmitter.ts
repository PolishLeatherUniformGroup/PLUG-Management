import { Injectable } from '@nestjs/common';
import { EventPayloads } from './event-payloads';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TypedEventEmitter {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async emitAsync<K extends keyof EventPayloads>(
    event: K,
    payload: EventPayloads[K],
  ): Promise<any> {
    await this.eventEmitter.emitAsync(event, payload);
  }
}
