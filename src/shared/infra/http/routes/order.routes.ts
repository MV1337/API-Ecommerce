import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListOrdersByUserController } from "@modules/products/useCases/listOrdersByUser/ListOrdersByUserController";
import { ListAllOrdersController } from "@modules/products/useCases/listAllOrders/ListAllOrdersController";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const orderRoutes = Router()

const listOrdersByUserController = new ListOrdersByUserController()
const listAllOrdersController = new ListAllOrdersController()

orderRoutes.get("/", ensureAuthenticated, listOrdersByUserController.handle)
orderRoutes.get("/all", ensureAuthenticated, ensureAdmin, listAllOrdersController.handle)

export {orderRoutes}