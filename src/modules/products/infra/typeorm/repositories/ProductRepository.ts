import { IProductRepository } from "@modules/products/repositories/IProductRepository";
import { Product } from "../entities/Product";
import { DeleteResult, Repository, getRepository, Like } from "typeorm";

class ProductRepository implements IProductRepository {
  private repository: Repository<Product>;
  constructor() {
    this.repository = getRepository(Product);
  }
  async create({
    description,
    price,
    title,
    trailer,
    year,
    genre,
    image_name,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.repository.create({
      price,
      title,
      trailer,
      year,
      description,
      genre,
      image_name,
    });

    await this.repository.save(product);

    return product;
  }

  async listAll(): Promise<Product[]> {
    const allProducts = await this.repository.find();

    return allProducts;
  }

  async remove(product_id: string): Promise<DeleteResult> {
    const product = await this.repository.delete(product_id);

    return product;
  }

  async findById(product_id: string): Promise<Product> {
    const product = await this.repository.findOne(product_id);

    return product;
  }

  async findByTitle(title: string): Promise<Product> {
    const product = await this.repository.findOne({ title });

    return product;
  }

  async findByGenre(genre: string): Promise<Product[]> {
    const products = await this.repository.find({ genre: Like(`%${genre}%`) });

    return products;
  }
}

export { ProductRepository };
