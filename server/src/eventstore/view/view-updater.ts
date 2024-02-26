import { Injectable, Type } from '@nestjs/common';
import { IEvent } from '@nestjs/cqrs';
import { ModuleRef } from '@nestjs/core';
import { ViewUpdaters } from './view-updaters';
import { IViewUpdater } from './interfaces/view-updater';

@Injectable()
export class ViewUpdater {
  private instances: Map<Type<IViewUpdater<IEvent>>, IViewUpdater<IEvent>> =
    new Map<Type<IViewUpdater<IEvent>>, IViewUpdater<IEvent>>();

  constructor(private moduleRef: ModuleRef) {}

  async run<T extends IEvent>(event: T): Promise<void> {
    const updater = ViewUpdaters.get(event.constructor.name);
    if (updater) {
      if (!this.instances.has(updater)) {
        this.instances.set(
          updater,
          this.moduleRef.get(updater.name, { strict: false }),
        );
      }
      await (this.instances.get(updater) as IViewUpdater<IEvent>).handle(event);
    }
    return;
  }
}
