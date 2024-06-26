import EventInterface from "../event.interface";

// Contem os dados de quanto o evento é criado
export default class ProductCreatedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
}