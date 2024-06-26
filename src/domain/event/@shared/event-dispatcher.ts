import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

// Ações nos Eventos: Notificar, Registrar e Desregistrar
export default class EventDispatcher implements EventDispatcherInterface{
    // Lista de EventHandlers
    private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

    // Retorno um event da lista de events
    get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
        return this.eventHandlers;
    }

    notify(event: EventInterface): void {
        // Pega o nome do event
        const eventName = event.constructor.name;

        // valida se existe o evento registrado
        if (this.getEventHandlers[eventName]){

            // forEach no eventos
            this.eventHandlers[eventName].forEach((eventHandler) => {
                // Executa o handle do evento
                eventHandler.handle(event);
            })

        }
    }

    register(eventName: string, eventHandler: EventHandlerInterface): void {
        if(!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        // Adiciona os eventos na lista
        this.eventHandlers[eventName].push(eventHandler);
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface): void {

        if(this.eventHandlers[eventName]) {
            const index = this.eventHandlers[eventName].indexOf(eventHandler)
            if (index !== -1){                
                this.eventHandlers[eventName].splice(index, 1);                
            }
        }
    }

    unregisterAll(): void {
        this.eventHandlers = {};   
    }
        
}