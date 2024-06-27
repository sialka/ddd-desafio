import EventHandlerInterface from "../../event-handler.interface";
import CustomerChangeAddressEvent from "../customer-change-Address.events";

// Ação do Evento                     
export default class SendMsgWhenChangeAddressIsUpdatedHandler implements EventHandlerInterface<CustomerChangeAddressEvent> {

    handle(event: CustomerChangeAddressEvent): void {
        const id = event.eventData.customer.id;
        const nome = event.eventData.customer.name;
        let endereco = `${event.eventData.customer.Address.street}, `;
        endereco += `${event.eventData.customer.Address.number}`       
                
        console.log(`Endereço do cliente: ${id}, ${nome} alterado para: ${endereco}`);
    }
}