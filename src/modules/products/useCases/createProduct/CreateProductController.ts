import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProductUseCase } from "./CreateProductUseCase";

class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { year, title, description, trailer, price, genre } = request.body;

    const image_name = request.file.filename;

    const createProductUseCase = container.resolve(CreateProductUseCase);

    await createProductUseCase.execute({
      description,
      price,
      title,
      trailer,
      year,
      genre,
      image_name,
    });

    return response
      .status(200)
      .json({ message: "Produto adicionado com sucesso..." });
  }
}

export { CreateProductController };
