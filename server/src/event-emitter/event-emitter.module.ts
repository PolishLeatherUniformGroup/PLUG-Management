import { Global, Module } from '@nestjs/common';
import { TypedEventEmitter } from './typed-event-emmitter';

@Global()
@Module({
  providers: [TypedEventEmitter],
  exports: [TypedEventEmitter],
})
export class TypedEventEmitterModule {}
