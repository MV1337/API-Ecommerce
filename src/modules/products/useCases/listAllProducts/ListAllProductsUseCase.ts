import { ProductMap } from "@modules/products/mapper/ProductMap";
import { IProductRepository } from "@modules/products/repositories/IProductRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListAllProductsUseCase {
  constructor(
    @inject("ProductRepository")
    private repository: IProductRepository
  ) {}
  async execute(): Promise<any>{
    const products = await this.repository.listAll();

    const productsResponse = products.map((product) => {
      return ProductMap.toDTO(product)
    })

    return productsResponse
  }
}

export { ListAllProductsUseCase };
