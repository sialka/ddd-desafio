import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

// É quem registra e notifica tudo o que acontece
export default interface EventDispatcherInterface {

    notify(event: EventInterface): void;
    register(eventName: string, eventHandler: EventHandlerInterface): void;
    unregister(eventName: string, eventHandler: EventHandlerInterface): void;
    unregisterAll(): void;
}