import EventHandlerInterface from "../../event-handler.interface";
import CustomerCreatedEvent from "../customer-created.events";

// Ação do Evento                     
export default class SendMsg1WhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {

    handle(event: CustomerCreatedEvent): void {
        console.log(`Esse é o primeiro console.log do evento: CustomerCreated`);
    }
}