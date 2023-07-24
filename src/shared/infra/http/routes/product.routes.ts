import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { CreateProductController } from "@modules/products/useCases/createProduct/CreateProductController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListAllProductsController } from "@modules/products/useCases/listAllProducts/ListAllProductscontroller";
import { RemoveProductController } from "@modules/products/useCases/removeProduct/RemoveProductController";
import { ProductPaymentController } from "@modules/products/useCases/productPayment/ProductPaymentController";
import { WebHookUController } from "@modules/products/useCases/webHook/WebHookController";
import uploadConfig from "@config/upload";
import multer from "multer";
import { FindProductByIdController } from "@modules/products/useCases/findProductById/FindProductByIdController";
import { FindByGenreController } from "@modules/products/useCases/findByGenre/FindByGenreController";

const productRoutes = Router();

const uploadProductImage = multer(uploadConfig);

const createProductController = new CreateProductController();
const listAllProductsController = new ListAllProductsController();
const removeProductController = new RemoveProductController();
const productPaymentController = new ProductPaymentController();
const webHookUController = new WebHookUController();
const findProductByIdController = new FindProductByIdController();
const findByGenreController = new FindByGenreController();

productRoutes.get("/", listAllProductsController.handle);

productRoutes.get("/search", findByGenreController.handle);

productRoutes.get("/:product_id", findProductByIdController.handle);

productRoutes.post(
  "/payment",
  ensureAuthenticated,
  productPaymentController.handle
);

productRoutes.post("/webHook", webHookUController.handle);

productRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  uploadProductImage.single("image_name"),
  createProductController.handle
);

productRoutes.delete(
  "/:product_id",
  ensureAuthenticated,
  ensureAdmin,
  removeProductController.handle
);

export { productRoutes };
