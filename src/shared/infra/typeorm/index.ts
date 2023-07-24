import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { Feedback } from "@modules/products/infra/typeorm/entities/Feedback";
import { Order } from "@modules/products/infra/typeorm/entities/Order";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { createConnection } from "typeorm";
import { CreateFeedback1686077863140 } from "./migrations/1686077863140-CreateFeedback";
import { CreateUser1686077735163 } from "./migrations/1686077735163-CreateUser";
import { SaveOrder1686077836205 } from "./migrations/1686077836205-SaveOrder";
import { CreateUserToken1686077885932 } from "./migrations/1686077885932-CreateUserToken";
import { CreateProduct1686077804754 } from "./migrations/1686077804754-CreateProduct";

createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "",
  password: "",
  database: "",
  entities: [User, Product, UserTokens, Feedback, Order],
  migrations: [
    CreateFeedback1686077863140,
    CreateUser1686077735163,
    SaveOrder1686077836205,
    CreateUserToken1686077885932,
    CreateProduct1686077804754,
  ],
})
  .then(() => {
    console.log("Conexão feita com sucesso.");
  })
  .catch((err) => {
    console.log("Error" + err);
  });