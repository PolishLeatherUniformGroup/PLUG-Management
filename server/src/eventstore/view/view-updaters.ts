import { IEvent } from '@nestjs/cqrs';
import { Type } from '@nestjs/common';
import { IViewUpdater } from './interfaces/view-updater';

export class ViewUpdaters {
  private static updaters = new Map<string, Type<IViewUpdater<IEvent>>>();

  static add(name: string, handler: Type<IViewUpdater<IEvent>>) {
    ViewUpdaters.updaters.set(name, handler);
  }

  static get(name: string): Type<IViewUpdater<IEvent>> {
    return ViewUpdaters.updaters.get(name) as Type<IViewUpdater<IEvent>>;
  }
}
