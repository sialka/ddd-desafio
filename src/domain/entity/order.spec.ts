import Order from "./order";
import OrderItem from "./order_item";

// Switch de Testes
describe("Order unit test", () => {

    // Test Id
    it("should throw erro when id is empty", () => {

        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("Id is required");

    })

    // Test customerId
    it("should throw erro when customerId is empty", () => {

        expect(() => {
            let order = new Order("123", "", []);
        }).toThrowError("customerId is required");
        
    })

    // Test Items
    it("should throw erro when item is empty", () => {

        expect(() => {
            let order = new Order("123", "123", []);            
        }).toThrowError("Items qtd must be greater than 0");
        
    })

    // Test Items
    it("should calculate total", () => {

        const item1 = new OrderItem("i1", "Item 1", 100, "p1", 2);
        const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);

        const order = new Order("o1", "c1", [item1]);            

        let total = order.total();
        expect(total).toBe(200);

        const order2 = new Order("o1", "c1", [item1,item2]);            
        total = order2.total();
        expect(total).toBe(600);
        
    })    


    // Test Items com quantidade 0
    it("should throw error if the qte is less or equal zero", () => {
        
        expect(() => {
            const item = new OrderItem("i1", "Item 1", 100, "p1", 0)        
            const order = new Order("o1", "c1", [item]);            
        }).toThrowError("Quantity must be greater than 0");
        
    })     
});