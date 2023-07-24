import { AppError } from "@errors/AppError";
import { IProductRepository } from "@modules/products/repositories/IProductRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { inject, injectable } from "tsyringe";

@injectable()
class RemoveProductUseCase {
  constructor(
    @inject("ProductRepository")
    private repository: IProductRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}
  async execute(product_id: string) {
    const product = await this.repository.findById(product_id);

    if (!product) {
      throw new AppError("Produto não encontrado...");
    }

    await this.storageProvider.delete(product.image_name, "product");

    await this.repository.remove(product_id);
  }
}

export { RemoveProductUseCase };
