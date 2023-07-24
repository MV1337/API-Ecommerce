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

    const allOrders = await Promise.all(
      orders.map(async (order) => {
        const product = await this.productRepository.findByTitle(
          order.product_title
        );
        const user = await this.usersRepository.findById(order.user_id);
        const objByOder = {
          order: order.id,
          name: user.name,
          title: product.title,
          price: product.price,
          status: order.status,
          created_at: order.created_at
        };
        return objByOder;
      })
    );

    const salesAmount = allOrders.length

    const totalSalesValue = allOrders.reduce((sum, order) => {
      const price = Number(order.price);
      return sum + price;
    }, 0);

    const formatNumberToInteger = totalSalesValue.toFixed(0);

    const returnResponse = {
      allOrders,
      totalSalesValue: formatNumberToInteger, 
      salesAmount
    }

    return returnResponse
  }
}

export { ListAllOrdersUseCase };
