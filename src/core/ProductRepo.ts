import Product from "./Product";

export default interface ProductRepo {
  save(product: Product): Promise<Product>;
  delete(product: Product):Promise<void>;
  getAll(): Promise<Product[]>;
}
