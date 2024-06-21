import Address from "./address";
import Customer from "./customer";

// Switch de Testes
describe("Customer unit test", () => {

    // Testando a switch
    it("should get as result", () => {
        const result = 1;
        expect(result).toBe(1);
    })

    // Testando validate() - Id is required
    it("should throw error when id empty", () => {
        
        expect(() => {
            let customer = new Customer("", "John");
        }).toThrowError("Id is required");
        
    });

    // Testando validate() - Name is required
    it("should throw error when name empty", () => {
        
        expect(() => {
            let customer = new Customer("1", "");
        }).toThrowError("Name is required");
        
    });   
    
    // Testando changeName
    it("should change name", () => {
        
        // Arrange (arranjo)        
        let customer = new Customer("1", "John");

        // Act (Agir)
        customer.changeName("Jane")
        
        // Assert (Afirmar)
        expect(customer.name).toBe("Jane");        
        
    });  

    // Testando activate()
    it("should activate customer", () => {
        
        // Arrange (arranjo)        
        const customer = new Customer("1", "John");
        const address = new Address("Rua Xico", 2, "01040-100", "Guarulhos")
        customer.Address = address
        
        customer.activate()

        expect(customer.isActive()).toBe(true);        
        
    });   

    // Testando falta de endereço na ativação
    it("should throw error when address is undefined when you activate a customer", () => {

        expect(() => {
            const customer = new Customer("1", "John");
            customer.activate()
        }).toThrowError("Address is mandatory to activate a customer");    
        
    });

    // Testando deactivate()
    it("should deactivate customer", () => {
        
        // Arrange (arranjo)        
        const customer = new Customer("1", "John");        
        customer.deactivate()

        expect(customer.isActive()).toBe(false);        
        
    });  
});