import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateFeedbackUseCase } from "./CreateFeedbackUseCase";

class CreateFeedbackController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {id} = request.user;
    const { order_id } = request.params;
    const { feedback, feedbackWithStars} = request.body;

    const createFeedbackUseCase = container.resolve(CreateFeedbackUseCase);

    await createFeedbackUseCase.execute({
      feedback,
      feedbackWithStars,
      order_id,
      user_id: id
    });

    return response.status(201).json({ message: "Feedback adicionado com sucesso!!" });
  }
}

export { CreateFeedbackController };
