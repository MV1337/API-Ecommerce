import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IFeedbackRepository } from "@modules/products/repositories/IFeedbackRepository";
import { IOrderRepository } from "@modules/products/repositories/IOrderRepository";
import { IProductRepository } from "@modules/products/repositories/IProductRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  order_id: string;
  feedback: string;
  feedbackWithStars: number;
  user_id: any;
}

@injectable()
class CreateFeedbackUseCase {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository,
    @inject("FeedbackRepository")
    private feedbackRepository: IFeedbackRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}
  async execute({ feedback, feedbackWithStars, order_id, user_id }: IRequest) {
    const order = await this.orderRepository.findByOrderId(order_id);
    const user = await this.usersRepository.findById(order.user_id);

    if (order.feedbackStatus) {
      throw new AppError(
        "Você já deixou o seu feedback sobre o produto, muito obrigado!!!"
      );
    }

    if (order.user_id !== user_id) {
      throw new AppError("Você não pode avaliar compra de outros usuários.");
    }

    const createFeedback = await this.feedbackRepository.create({
      feedback,
      feedbackWithStars,
      order_id,
      product_title: order.product_title,
      user_name: user.name,
      product_id: order.product_id
    });

    await this.orderRepository.updateFeedbackStatus(order_id, true);

    return createFeedback;
  }
}

export { CreateFeedbackUseCase };
