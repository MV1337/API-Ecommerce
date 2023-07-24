import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password} = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      password,
    });

    return response.status(201).json({message:"Um e-mail de confirmação foi enviado para o seu endereço de e-mail, caso não localize, veja na pasta de spam."});
  }
}

export { CreateUserController };
