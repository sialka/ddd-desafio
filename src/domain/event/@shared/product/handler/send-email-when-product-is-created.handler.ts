import EventHandlerInterface from "../../event-handler.interface";
import ProductCreatedEvent from "../product-created.events";

// Ação do Evento                     
export default class SendEMailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {

    handle(event: ProductCreatedEvent): void {
        console.log(`Send email to .....`);
    }
}