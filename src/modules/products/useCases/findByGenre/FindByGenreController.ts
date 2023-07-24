import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByGenreUseCase } from "./FindByGenreUseCase";

class FindByGenreController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { q } = request.query;

    const findByGenreUseCase = container.resolve(FindByGenreUseCase);

    const products = await findByGenreUseCase.execute(q);

    return response.json(products);
  }
}

export { FindByGenreController };
