import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveFeedbackByIdUseCase } from "./RemoveFeedbackByIdUseCase";

class RemoveFeedbackByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params

        const removeFeedbackByIdUseCase = container.resolve(RemoveFeedbackByIdUseCase)

        await removeFeedbackByIdUseCase.execute(id)

        return response.status(200).json({message: "Removido com sucesso!"})
    }
}

export {RemoveFeedbackByIdController}