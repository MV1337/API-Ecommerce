import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProductPaymentUseCase } from "./ProductPaymentUseCase";

class ProductPaymentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const products = request.body;
    const user_id = request.user;

    const productPaymentUseCase = container.resolve(ProductPaymentUseCase);

    const session = await productPaymentUseCase.execute({ products, user_id });

    return response.json(session.url);
  }
}

export { ProductPaymentController };
