import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { Expose } from "class-transformer";

@Entity("products")
class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  trailer: string;

  @Column()
  year: number;

  @Column()
  genre: string;

  @Column()
  image_name: string;

  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: "productImage_url" })
  productImage_url(): string {
    switch (process.env.disk) {
      case "local":
        return `${process.env.APP_API_URL}/product/${this.image_name}`;
      case "s3":
        return `${process.env.AWS_BUCKET_URL}/product/${this.image_name}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Product };
