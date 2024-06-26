import EventHandlerInterface from "../../event-handler.interface";
import CustomerCreatedEvent from "../customer-created.events";

// Ação do Evento                     
export default class SendMsgWhenChangeAddressIsUpdatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {

    handle(event: CustomerCreatedEvent): void {
        const id = event.eventData.customer.id;
        const nome = event.eventData.customer.name;
        let endereco = `${event.eventData.customer.Address.street}, `;
        endereco += `${event.eventData.customer.Address.number}`       
                
        console.log(`Endereço do cliente: ${id}, ${nome} alterado para: ${endereco}`);
    }
}