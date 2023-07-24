import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserInfoUseCase } from "./listUserInfoUseCase";

class ListUserInfoController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const listUserInfoUseCase = container.resolve(ListUserInfoUseCase);

    const user = await listUserInfoUseCase.execute(id);

    return response.json(user);
  }
}

export { ListUserInfoController };
