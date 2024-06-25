import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {                       
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            })),     
        },{
            include: [{model: OrderItemModel}]
        });
    }

    async update(entity: Order): Promise<void> {                          

        const sequelize = OrderModel.sequelize;
        await sequelize.transaction(async (t) => {
          await OrderItemModel.destroy({
            where: { order_id: entity.id },
            transaction: t,
          });
          const items = entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
            order_id: entity.id,
          }));
          await OrderItemModel.bulkCreate(items, { transaction: t });
          await OrderModel.update(
            { total: entity.total() },
            { where: { id: entity.id }, transaction: t }
          );
        });  
    }
    
    async find(id: string): Promise<Order> {       
        
        const orderModel = await OrderModel.findOne({
            where: { id: id },
            include: ["items"],
        });            
        
        const itens = orderModel.dataValues.items[0]        
        const items = new OrderItem(
            itens.dataValues.id,
            itens.dataValues.name,
            itens.dataValues.price,
            itens.dataValues.product_id,
            itens.dataValues.quantity
        );
        
        const order = new Order(
            orderModel.dataValues.id,
            orderModel.dataValues.customer_id,
            [items]
        )
        
        return order;
    }

    async findAll(): Promise<Order[]> {

        const orderModels = await OrderModel.findAll({
            include: ["items"]
        });

        const orders = orderModels.map((orderModels) => {
            
            const itens = orderModels.dataValues.items[0]        
            const items = new OrderItem(
                itens.dataValues.id,
                itens.dataValues.name,
                itens.dataValues.price,
                itens.dataValues.product_id,
                itens.dataValues.quantity
            );
            
            const order = new Order(
                orderModels.dataValues.id,
                orderModels.dataValues.customer_id,
                [items]
            );
            
            return order;
        });

        return orders;
    }

}