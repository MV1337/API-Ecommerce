import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { DeleteResult } from "typeorm";
import { IProductRepository } from "../IProductRepository";

class ProductRepositoryInMemory implements IProductRepository {
  findByGenre(genre: string): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  products: Product[] = [];

  async create({
    description,
    genre,
    image_name,
    price,
    title,
    trailer,
    year,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      description,
      genre,
      image_name,
      price,
      title,
      trailer,
      year,
    });

    this.products.push(product);

    return product;
  }
  listAll(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  remove(product_id: string): Promise<DeleteResult> {
    throw new Error("Method not implemented.");
  }
  findById(product_id: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }

  findByTitle(title: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }
}

export { ProductRepositoryInMemory };
