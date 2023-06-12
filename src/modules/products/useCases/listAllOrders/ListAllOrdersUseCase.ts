import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IOrderRepository } from "@modules/products/repositories/IOrderRepository";
import { IProductRepository } from "@modules/products/repositories/IProductRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListAllOrdersUseCase {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository,
    @inject("ProductRepository")
    private productRepository: IProductRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute() {
    const orders = await this.orderRepository.listAll();

    const orderInfo = await Promise.all(
      orders.map(async (order) => {
        const product = await this.productRepository.findByTitle(order.product_title);
        const user = await this.usersRepository.findById(order.user_id);
        const objByOder = {
          order: order.id,
          name: user.name,
          title: product.title,
          price: product.price,
          status: order.status,
        };
        return objByOder;
      })
    );
    return orderInfo;
  }
}

export { ListAllOrdersUseCase };
