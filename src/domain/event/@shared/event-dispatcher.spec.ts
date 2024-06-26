import EventDispatcher from "./event-dispatcher";
import SendEMailWhenProductIsCreatedHandler from "./product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "./product/product-created.events";

describe("Domain events test", () => {    

    it("should register an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEMailWhenProductIsCreatedHandler();

        // registrando o evento
        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        // verificar se existe
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        // verifica a qtd de eventos
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        // verifica se o evento é do tipo eventHandler
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    });

    it("should unregister an event handler", () => {
        
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEMailWhenProductIsCreatedHandler();

        // registrando o evento
        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        // verifica se o evento é do tipo eventHandler
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        // verificar se existe
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        
        // verifica a qtd de eventos
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);

    });

    it("should unregister all event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEMailWhenProductIsCreatedHandler();

        // registrando o evento
        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        // verifica se o evento é do tipo eventHandler
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        // verifica a qtd de eventos
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();

    });

    it("should notify all event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEMailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        // registrando o evento
        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        // verifica se o evento é do tipo eventHandler
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        // Produto a ser notificado
        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0,
        })

        // Qdo o notify for executado o SendEMailWhenProductIsCreatedHandler.handle() deve ser executado
        eventDispatcher.notify(productCreatedEvent);

        // usamos o spyEventHandler do jest para espiar o resultado
        // ou seja fica espiando o eventHandler para ver se executa o handle

        expect(spyEventHandler).toHaveBeenCalled();

    });

});