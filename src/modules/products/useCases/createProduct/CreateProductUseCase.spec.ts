import { CreateProductUseCase } from "./CreateProductUseCase";
import { ProductRepositoryInMemory } from "@modules/products/repositories/inMemory/ProductReposirotyInMemory";

let productRepository: ProductRepositoryInMemory
let createProductUseCase: CreateProductUseCase

describe("Create Product", () => {
    beforeEach(() => {
        productRepository = new ProductRepositoryInMemory()
        createProductUseCase = new CreateProductUseCase(productRepository)
    })

    it("Should be able to create a new Product", async () => {
        const product = await createProductUseCase.execute({
            title: "Jogo teste",
            description: "Jogo teste",
            genre: "Jogo teste",
            price: 99,
            image_name: "image test",
            trailer: "jogo teste",
            year: 2002
        })

        expect(product).toHaveProperty("id")
    })
})