import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {

    it("should change the prices of all products", () => {

        const product1 = new Product("id1", "product 1", 10);
        const product2 = new Product("id2", "product 2", 20);
        const products = [product1, product2 ];

        // Aumentar o preço dos produtos em 100% (método estático)
        ProductService.increasePrice(products, 100);

        expect(product1.price).toBe(20);
        expect(product2.price).toBe(40);

    });

});