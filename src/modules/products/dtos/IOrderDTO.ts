interface IOrderDTO {
  user_id: string;
  product_id: string
  product_title: string;
  status: string;
  feedbackStatus?: boolean
}

export { IOrderDTO };
