
import Customer from './domain/entity/customer'
import Address from './domain/entity/address'
import OrderItem from './domain/entity/order_item';
import Order from './domain/entity/order';

// Customer Aggregate
let customer = new Customer("18", "Gru");
let address = new Address("rua ana",63,"08543-001","São Paulo");
customer.Address = address
customer.activate();

// Order Aggregate
//const item1 = new OrderItem("1", "Item 1", 10);
//const item2 = new OrderItem("2", "Item 2", 15);
//const order = new Order("1", "18", [item1, item2])