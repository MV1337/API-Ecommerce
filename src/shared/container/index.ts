import { container } from "tsyringe";
import "@shared/container/providers";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IProductRepository } from "@modules/products/repositories/IProductRepository";
import { ProductRepository } from "@modules/products/infra/typeorm/repositories/ProductRepository";
import { IOrderRepository } from "@modules/products/repositories/IOrderRepository";
import { OrderRepository } from "@modules/products/infra/typeorm/repositories/OrderRepository";
import { IFeedbackRepository } from "@modules/products/repositories/IFeedbackRepository";
import { FeedbackRepository } from "@modules/products/infra/typeorm/repositories/FeedbackRepository";
import { IUserstokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepositoy";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IProductRepository>(
  "ProductRepository",
  ProductRepository
)

container.registerSingleton<IOrderRepository>(
  "OrderRepository",
  OrderRepository
)

container.registerSingleton<IFeedbackRepository>(
  "FeedbackRepository",
  FeedbackRepository
)

container.registerSingleton<IUserstokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);