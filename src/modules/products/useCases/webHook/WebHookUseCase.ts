import { IOrderRepository } from "@modules/products/repositories/IOrderRepository";
import { inject, injectable } from "tsyringe";
import { resolve } from "path";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { IProductRepository } from "@modules/products/repositories/IProductRepository";

import Stripe from "stripe";

const stripe = new Stripe(
  "",
  {
    apiVersion: "2022-11-15",
  }
);

@injectable()
class WebHookUseCase {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider,
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}
  async execute(event: any) {
    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "confirmPayment.hbs"
    );

    const eventMetadata = event.data.object.metadata;
    const checkoutId = event.data.object.id;

    const user = await this.usersRepository.findById(eventMetadata.user_id);

    const titleByProducts = await stripe.checkout.sessions.retrieve(
      `${checkoutId}`,
      {
        expand: ["line_items"],
      }
    );

    const products = titleByProducts.line_items.data.map((item) => {
      const product_title = item.description;

      return product_title;
    });

    const variables = {
      name: user.name,
      products,
    };

    switch (event.type) {
      case "checkout.session.completed":
        const eventObj = event.data.object;

        products.map(async (productTitle) => {
          const product = await this.productRepository.findByTitle(
            productTitle
          );
          await this.orderRepository.create({
            user_id: eventObj.metadata.user_id,
            product_title: productTitle,
            status: eventObj.status,
            product_id: product.id,
          });
        });

        await this.mailProvider.sendMail(
          user.email,
          "Confirmação de compra",
          variables,
          templatePath
        );
        break;
    }
  }
}

export { WebHookUseCase };
