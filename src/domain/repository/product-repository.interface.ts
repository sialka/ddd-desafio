import Product from "../entity/product";
import RepositoryInterace from "./repository-interface";

export default interface ProductRepositoryInterface
    extends RepositoryInterace<Product> {}
