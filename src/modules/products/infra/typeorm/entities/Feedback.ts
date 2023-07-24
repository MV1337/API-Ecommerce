import {v4 as uuidv4} from 'uuid'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("feedbacks")
class Feedback {
  @PrimaryColumn()
  id: string;

  @Column()
  order_id: string;

  @Column()
  product_id: string

  @Column()
  product_title: string

  @Column()
  user_name: string

  @Column()
  feedback: string;

  @Column()
  feedbackWithStars: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id) {
        this.id = uuidv4()
    }
  }
}

export { Feedback };
