import { Injectable, Logger } from '@nestjs/common';
import { EventPayloads } from './event-payloads';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TypedEventEmitter {
  private readonly logger = new Logger(TypedEventEmitter.name);
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async emitAsync<K extends keyof EventPayloads>(
    event: K,
    payload: EventPayloads[K],
  ): Promise<any> {
    this.logger.log(`Emitting event: ${event}`);
    await this.eventEmitter.emitAsync(event, payload);
  }
}
