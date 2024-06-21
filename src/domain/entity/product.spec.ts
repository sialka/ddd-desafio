import Product from "./product";

// Switch de Testes
describe("Product unit test", () => {

    // Test Id
    it("should throw erro when id is empty", () => {

        expect(() => {
            const product = new Product("", "Product 1", 100);
        }).toThrowError("Id is required");

    })

    // Test Name
    it("should throw erro when name is empty", () => {

        expect(() => {
            const product = new Product("1", "", 100);
        }).toThrowError("Name is required");

    })

    // Test Price
    it("should throw erro when price is less than zero", () => {

        expect(() => {
            const product = new Product("1", "Product 1", -1);
        }).toThrowError("Price must be greater than zero");

    })

    // Test Change Name
    it("should change name", () => {

        const product = new Product("1", "Product 1", 100);
        product.changeName("Product 2");

        expect(product.name).toBe("Product 2");

    })

    // Test Change Price
    it("should change price", () => {

        const product = new Product("1", "Product 1", 100);
        product.changePrice(200);

        expect(product.price).toBe(200);

    })    
  
});