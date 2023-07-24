import { IFeedbackRepository } from "@modules/products/repositories/IFeedbackRepository";
import { Feedback } from "../entities/Feedback";
import { ICreateFeedbackDTO } from "@modules/products/dtos/ICreateFeedbackDTO";
import { Repository, getRepository } from "typeorm";

class FeedbackRepository implements IFeedbackRepository {
  private repository: Repository<Feedback>;
  constructor() {
    this.repository = getRepository(Feedback);
  }
  async create({
    feedback,
    feedbackWithStars,
    product_id,
    order_id,
    product_title,
    user_name,
  }: ICreateFeedbackDTO): Promise<Feedback> {
    const createFeedback = this.repository.create({
      feedback,
      feedbackWithStars,
      order_id,
      product_title,
      product_id,
      user_name,
    });

    await this.repository.save(createFeedback);

    return createFeedback;
  }

  async findByProductId(product_id: string): Promise<Feedback[]> {
    const feedbacksByProductId = await this.repository.find({ product_id });

    return feedbacksByProductId;
  }

  async findById(feedback_id: string): Promise<Feedback> {
    const feedback = await this.repository.findOne(feedback_id)

    return feedback
  }

  async removeById(feedback_id: string): Promise<void> {
    await this.repository.delete(feedback_id)
  }
}

export { FeedbackRepository };
