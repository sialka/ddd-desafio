import EventHandlerInterface from "../../event-handler.interface";
import CustomerCreatedEvent from "../customer-created.events";

// Ação do Evento                     
export default class SendMsg2WhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {

    handle(event: CustomerCreatedEvent): void {
        console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
    }
}