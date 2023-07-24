import { IOrderDTO } from "../dtos/IOrderDTO";
import { Order } from "../infra/typeorm/entities/Order";

interface IOrderRepository {
  create(data: IOrderDTO): Promise<Order>;
  findByUserId(user_id: string): Promise<Order[]>
  findByOrderId(order_id: string): Promise<Order>
  updateFeedbackStatus(id: string, feedbackStatus: boolean): Promise<void>
  listAll(): Promise<Order[]>
}

export { IOrderRepository };
