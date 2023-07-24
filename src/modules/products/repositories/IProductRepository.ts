import { DeleteResult } from "typeorm";
import { Product } from "../infra/typeorm/entities/Product";

interface IProductRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  listAll(): Promise<Product[]>;
  remove(product_id: string): Promise<DeleteResult>;
  findById(product_id: string): Promise<Product>;
  findByTitle(title: string): Promise<Product>
  findByGenre(genre: string): Promise<Product[]>
}

export { IProductRepository };
