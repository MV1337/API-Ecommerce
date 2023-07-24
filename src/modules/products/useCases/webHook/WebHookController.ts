import { Request, Response } from "express";
import { container } from "tsyringe";
import { WebHookUseCase } from "./WebHookUseCase";

class WebHookUController {
  async handle(request: Request, response: Response): Promise<Response> {
    const event = request.body;

    const webHookUseCase = container.resolve(WebHookUseCase);

    const result = await webHookUseCase.execute(event);

    return response.status(200).json(result);
  }
}

export { WebHookUController };
