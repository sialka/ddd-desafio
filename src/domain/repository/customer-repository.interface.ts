import Customer from "../entity/customer";
import RepositoryInterace from "./repository-interface";

export default interface CustomerRepositoryInterface
    extends RepositoryInterace<Customer> {}
