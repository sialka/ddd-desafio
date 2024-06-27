import EventDispatcher from "./event-dispatcher";
import SendMsg1WhenProductIsCreatedHandler from "./customer/handler/send-msg1-when-customer-is-created.handler";
import SendMsg2WhenProductIsCreatedHandler from "./customer/handler/send-msg2-when-customer-is-created.handler";
import CustomerCreatedEvent from "./customer/customer-created.events";
import CustomerChangeAddressEvent from "./customer/customer-change-Address.events";
import SendMsgWhenChangeAddressIsUpdatedHandler from "./customer/handler/send-msg-when-change-Address-is-update.handler";
import Customer from "../../entity/customer";
import Address from "../../entity/address";

describe("Domain events test", () => {    

    it("should register an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendMsg1WhenProductIsCreatedHandler();
        
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

    });
    
    it("should unregister an event handler", () => {
        
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendMsg1WhenProductIsCreatedHandler();
        
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
        
        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);        
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();                
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);

    });
    
    it("should unregister all event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendMsg1WhenProductIsCreatedHandler();
        
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();

    });
    
    // Customer

    it("should new customer event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendMsg1WhenProductIsCreatedHandler();
        const eventHandler2 = new SendMsg2WhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");        
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");        
        
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);               
        
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);
                
        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "1",
            name: "Customer 1",
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();

    });

    it("should change address event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendMsgWhenChangeAddressIsUpdatedHandler();
        
        const spyEventHandler = jest.spyOn(eventHandler, "handle");       
        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);        
        
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandler);                              
        
        const address = new Address("Rua Dois",1,"01212-001","SP");        
        const customer = new Customer("1", "Pedro");
        customer.changeAddress(address)

        const customerChangeAddressEvent = new CustomerChangeAddressEvent({
            customer: customer            
        });    

        eventDispatcher.notify(customerChangeAddressEvent);

        expect(spyEventHandler).toHaveBeenCalled();        

    });

});