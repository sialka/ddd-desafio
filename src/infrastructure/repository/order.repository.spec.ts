import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";
import OrderModel from "../db/sequelize/model/order.model";

describe("Order repository test", () => {

    let sequileze: Sequelize;

    beforeEach(async () => {
        sequileze = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });
        
        await sequileze.addModels([
            CustomerModel, 
            OrderModel, 
            OrderItemModel, 
            ProductModel
        ]);
        await sequileze.sync();
    });

    afterEach(async () => {
        await sequileze.close();
    });      
    
    /*
    it("should create a new order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [orderItem]);
                
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });

    });
    */

    it("should update a new order", async () => {

        // Customer
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        // Product
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        // OrderItem
        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        // Order
        const order = new Order("123", "123", [orderItem]);                
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);                

        // Find
        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });               

        // Update

        const product2 = new Product("456", "Product 2", 20);                
        const orderItemUpdate = new OrderItem(
            "1",
            product2.name,
            product2.price,
            product2.id,
            2
        );
        
        order.changeItems([orderItemUpdate]);                 
        await orderRepository.update(order);
        
        // Find
        const result = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        console.log(result);
        
        expect(result.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            items: [
                {
                    id: "1",                    
                    order_id: "123",
                    name: 'Product 1',
                    product_id: "123",
                    price: 10,
                    quantity: 2
                }
            ],                      
            total: 40,
        })

    });
    
    /*
    it("should find a order", async () => {

        // Customer
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        // Product
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        // OrderItem
        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        // Order
        const order = new Order("123", "123", [orderItem]);                
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);  

        // Find
        const orderResult = await orderRepository.find(order.id);
        
        expect(order).toStrictEqual(orderResult);      
        

    });

    it("should findAll a order", async () => {

        
        // Customer
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("123", "Customer 1");
        const customer2 = new Customer("456", "Customer 2");
        const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
        const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
        customer1.changeAddress(address1);
        customer2.changeAddress(address2);
        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        // Product
        const productRepository = new ProductRepository();
        const product1 = new Product("123", "Product 1", 10);
        const product2 = new Product("456", "Product 2", 20);
        await productRepository.create(product1);
        await productRepository.create(product2);

        // OrderItem
        const orderItem1 = new OrderItem(
            "1",
            product1.name,
            product1.price,
            product1.id,
            2
        );
        const orderItem2 = new OrderItem(
            "2",
            product2.name,
            product2.price,
            product2.id,
            2
        );        

        // Order
        const order1 = new Order("123", "123", [orderItem1]);                
        const order2 = new Order("456", "456", [orderItem2]);                
        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);
        await orderRepository.create(order2);

        // Find
        const orders = await orderRepository.findAll();

        console.log(orders)
        
        expect(orders).toHaveLength(2);
        expect(orders).toContainEqual(order1);
        expect(orders).toContainEqual(order2);


    });
    */
});
