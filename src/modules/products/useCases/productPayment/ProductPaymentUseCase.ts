import { classToClass } from "class-transformer";
import { IProductRepository } from "@modules/products/repositories/IProductRepository";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import Stripe from "stripe";

const stripe = new Stripe(
  "",
  {
    apiVersion: "2022-11-15",
  }
);

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
      //Codigo removido
    });

    const session = await stripe.checkout.sessions.create({
      // Codigo removido
    });

    return session
  }
}

export { ProductPaymentUseCase };
