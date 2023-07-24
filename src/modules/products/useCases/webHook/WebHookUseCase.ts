import { IOrderRepository } from "@modules/products/repositories/IOrderRepository";
import { inject, injectable } from "tsyringe";
import { resolve } from "path";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { IProductRepository } from "@modules/products/repositories/IProductRepository";
import Stripe from "stripe";
import { AppError } from "@errors/AppError";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

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
    const ordersByUser = await this.orderRepository.findByUserId(user.id);

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

        const allOrdersCreated = await Promise.all(
          products.map(async (productTitle) => {
            const product = await this.productRepository.findByTitle(
              productTitle
            );
            const order = await this.orderRepository.create({
              user_id: eventObj.metadata.user_id,
              product_title: productTitle,
              status: eventObj.status,
              product_id: product.id,
            });

            return order;
          })
        );

        ordersByUser.map(async (orderByUser) => {
          allOrdersCreated.map(async (order) => {
            if (
              order.product_title === orderByUser.product_title &&
              orderByUser.feedbackStatus === true
            ) {
              try {
                order.feedbackStatus = true;
                await this.orderRepository.updateFeedbackStatus(order.id, true);
              } catch (error) {
                throw new AppError(
                  "Ocorreu um erro, tente novamente mais tarde",
                  500
                );
              }
            }
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
