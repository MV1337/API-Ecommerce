import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListOrdersByUserUseCase } from "./ListOrdersByUserUseCase";

class ListOrdersByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {id} = request.user;
    
    const listOrdersByUserUseCase = container.resolve(ListOrdersByUserUseCase);

    const userOrders =  await listOrdersByUserUseCase.execute({user_id: id});

    return response.status(200).json(userOrders);
  }
}

export { ListOrdersByUserController };
