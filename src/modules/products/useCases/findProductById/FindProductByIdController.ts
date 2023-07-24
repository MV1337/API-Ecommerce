import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindProductByIdUseCase } from "./FindProductByIdUseCase";

class FindProductByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;

    const findProductByIdUseCase = container.resolve(FindProductByIdUseCase);

    const product = await findProductByIdUseCase.execute(product_id);

    return response.json([product]);
  }
}

export { FindProductByIdController };
