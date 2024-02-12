import { IEvent, IEventPublisher, IMessageSource } from "@nestjs/cqrs";
import { Subject } from "rxjs";
import { AggregateRoot } from "../domain";
import { Injectable } from "@nestjs/common";
import {Event} from "./event.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class EventStore implements IEventPublisher{
    constructor(@InjectRepository(Event) private readonly eventRepository: Repository<Event>){}
    private _eventHandlers: [];

    publish<TEvent extends IEvent>(event: TEvent, context?: unknown) {
        if ('id' in event === false) {
            throw new Error('Not a DomainEvent');
          }
      
          const message = JSON.parse(JSON.stringify(event));
          const id = message.id;
          const streamName = `${id}`;
          const type = event.constructor.name;        
      
          try {
             let entity = this.eventRepository.create();
             entity.data = message;
             entity.streamId = streamName;
             entity.eventType = type;
             entity.timestamp = new Date();
             this.eventRepository.save(entity)
          } catch (err) {
            // tslint:disable-next-line:no-console
            console.trace(err);
          }
    }

    publishAll?<TEvent extends IEvent>(events: TEvent[], context?: unknown) {
        throw new Error("Method not implemented.");
    }

    async read<T extends AggregateRoot>(aggregate:Function, id:string): Promise<T | null>{
        const streamName = `${id}`;

        try {
          const entity = Reflect.construct(aggregate, []);
          
          // read stream
        const eventStream:Event[] = await this.eventRepository.find({where: {streamId: streamName}, order:{timestamp :"ASC"}})

        const events = eventStream.map(event => {
            const eventType = event.eventType;
            const data = event.data;

            return (this._eventHandlers as { [key: string]: any })[eventType](...Object.values(data));
        });

        if (events.length === 0) {
            return null;
        }

        entity.loadFromHistory(events);
    
          return entity;
        } catch (err) {
          // tslint:disable-next-line:no-console
          console.trace(err);
        }
    
        return null;
    }

    addEventHandlers(eventHandlers: object) {
        this._eventHandlers = {
          ...this._eventHandlers,
          ...eventHandlers,
        };
      }

}