import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("orders")
class Order {
  @PrimaryColumn()
  id: string;

  @Column()
  product_id: string;

  @Column()
  product_title: string;

  @Column()
  user_id: string;

  @Column()
  status: string;

  @Column()
  feedbackStatus: boolean;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Order };
