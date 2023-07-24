import { AppError } from "@errors/AppError";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { IProductRepository } from "@modules/products/repositories/IProductRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
  title: string;
  price: number;
  year: number;
  trailer: string;
  description: string;
  genre: string;
  image_name: string;
}

@injectable()
class CreateProductUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}
  async execute({
    description,
    price,
    title,
    trailer,
    year,
    genre,
    image_name,
  }: IRequest): Promise<Product> {
    if (
      !description ||
      !price ||
      !title ||
      !year ||
      !trailer ||
      !image_name ||
      !genre
    ) {
      throw new AppError("Todos os campos são obrigatórios");
    }

    const product = await this.productRepository.create({
      description,
      price,
      title,
      trailer,
      year,
      genre,
      image_name,
    });

    await this.storageProvider.save(image_name, "product");

    return product;
  }
}

export { CreateProductUseCase };
