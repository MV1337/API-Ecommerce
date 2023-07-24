import { classToClass } from "class-transformer";
import { IProductResponseDTO } from "../dtos/IProductResponseDTO";
import { Product } from "../infra/typeorm/entities/Product";

class ProductMap {
  static toDTO({
    id,
    title,
    price,
    genre,
    image_name,
    productImage_url,
    trailer,
    description,
    year
  }: Product): IProductResponseDTO {
    const product = classToClass({
      id,
      title,
      price,
      genre,
      image_name,
      productImage_url,
      trailer,
      description,
      year
    });
    return product;
  }
}

export { ProductMap };
