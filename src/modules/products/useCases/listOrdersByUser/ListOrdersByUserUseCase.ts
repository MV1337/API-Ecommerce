import { AppError } from "@errors/AppError";
import { Order } from "@modules/products/infra/typeorm/entities/Order";
import { IOrderRepository } from "@modules/products/repositories/IOrderRepository";
import { IProductRepository } from "@modules/products/repositories/IProductRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id: any;
}

@injectable()
class ListOrdersByUserUseCase {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository,
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}
  async execute({ user_id }: IRequest) {
    const userOrders = await this.orderRepository.findByUserId(user_id);

    if (!userOrders) {
      throw new AppError("Vocẽ ainda não pussui nenhuma compra.");
    }

    return userOrders
  }
}

export { ListOrdersByUserUseCase };
