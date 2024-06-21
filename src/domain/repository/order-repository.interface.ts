import Order from "../entity/order";
import RepositoryInterace from "./repository-interface";

export default interface OrderRepositoryInterface
    extends RepositoryInterace<Order> {}
