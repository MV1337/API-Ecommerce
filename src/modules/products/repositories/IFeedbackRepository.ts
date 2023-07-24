import { ICreateFeedbackDTO } from "../dtos/ICreateFeedbackDTO"
import { Feedback } from "../infra/typeorm/entities/Feedback"

interface IFeedbackRepository {
    create(data: ICreateFeedbackDTO): Promise<Feedback>
    findByProductId(product_id: string): Promise<Feedback[]>
    removeById(feedback_id: string): Promise<void>
    findById(feedback_id: string): Promise<Feedback>
}

export {IFeedbackRepository}