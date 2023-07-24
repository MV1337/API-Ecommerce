import { ProductMap } from "@modules/products/mapper/ProductMap";
import { IProductRepository } from "@modules/products/repositories/IProductRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindByGenreUseCase {
    constructor(
        @inject("ProductRepository")
        private productRepository: IProductRepository
    ){}
    async execute(genre: any) {
        const products = await this.productRepository.findByGenre(genre)

        const productsResponse = products.map((product) => {
            return ProductMap.toDTO(product)
          })

        return productsResponse
    }
}

export {FindByGenreUseCase}