import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveProductUseCase } from "./RemoveProductUseCase";

class RemoveProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;

    const removeProductUseCase = container.resolve(RemoveProductUseCase);

    await removeProductUseCase.execute(product_id);

    return response.json({ message: "Produto removido com sucesso..." });
  }
}

export { RemoveProductController };
