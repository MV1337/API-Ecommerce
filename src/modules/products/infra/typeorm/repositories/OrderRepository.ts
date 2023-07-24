import { IOrderRepository } from "@modules/products/repositories/IOrderRepository";
import { Repository, getRepository } from "typeorm";
import { Order } from "../entities/Order";

class OrderRepository implements IOrderRepository {
  private repository: Repository<Order>;
  constructor() {
    this.repository = getRepository(Order);
  }
  async create({ user_id, status, product_title, product_id }): Promise<Order> {
    const order = this.repository.create({
      user_id,
      product_id,
      product_title,
      status,
    });

    await this.repository.save(order);

    return order;
  }

  async findByUserId(user_id: any): Promise<Order[]> {
    const ordersByUser = await this.repository.find({
      user_id,
    });

    return ordersByUser;
  }

  async findByOrderId(order_id: string): Promise<Order> {
    const order = await this.repository.findOne(order_id);

    return order;
  }

  async updateFeedbackStatus(
    id: string,
    feedbackStatus: boolean
  ): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ feedbackStatus })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }

  async listAll(): Promise<Order[]> {
    const orders = await this.repository
      .createQueryBuilder("orders")
      .orderBy("orders.created_at", "ASC")
      .getMany();

    return orders;
  }
}

export { OrderRepository };
