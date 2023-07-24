import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

interface IRequest {
  products: any;
  user_id: any;
}

@injectable()
class ProductPaymentUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ products, user_id }: IRequest) {
    const user = await this.usersRepository.findById(user_id);

    const line_items = products.map((product) => {
      return {
        price_data: {
          currency: "brl",
          product_data: {
            name: product.title,
            images: [product.productImage_url],
          },
          unit_amount: product.price * 100,
        },
        quantity: 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      metadata: {
        user_id: user.id,
      },
      mode: "payment",
      success_url: `${process.env.URL_SUCCESSFULL_PAYMENT}`,
      cancel_url: `${process.env.URL_PAYMENT_CANCELED}`,
    });

    return session;
  }
}

export { ProductPaymentUseCase };
