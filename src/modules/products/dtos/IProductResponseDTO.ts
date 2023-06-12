interface IProductResponseDTO {
  id: string;
  title: string;
  price: number;
  image_name: string
  productImage_url(): string;
}

export {IProductResponseDTO}
