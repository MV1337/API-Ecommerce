import { classToClass } from "class-transformer";
import { IProductResponseDTO } from "../dtos/IProductResponseDTO";
import { Product } from "../infra/typeorm/entities/Product";

class ProductMap {
  static toDTO({
    id,
    title,
    price,
    image_name,
    productImage_url,
  }: Product): IProductResponseDTO {
    const product = classToClass({
      id,
      title,
      price,
      image_name,
      productImage_url,
    });
    return product;
  }
}

export { ProductMap };
