import { AppError } from "@errors/AppError";
import { IFeedbackRepository } from "@modules/products/repositories/IFeedbackRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class RemoveFeedbackByIdUseCase {
    constructor(
        @inject("FeedbackRepository")
        private feedbackRepository: IFeedbackRepository
    ){}
    async execute(feedback_id: string): Promise<void> {
        const feedback = await this.feedbackRepository.findById(feedback_id)

        if(!feedback) {
            throw new AppError("Feedback não encontrado!")
        }

        await this.feedbackRepository.removeById(feedback_id)
    }
}

export {RemoveFeedbackByIdUseCase}