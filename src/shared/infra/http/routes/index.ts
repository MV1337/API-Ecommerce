import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { productRoutes } from "./product.routes";
import { orderRoutes } from "./order.routes";
import { feedbackRoutes } from "./feedback.routes";
import { passwordRoutes } from "./password.routes";

const router = Router();

router.use("/ecommerce/users", usersRoutes);
router.use("/ecommerce/products", productRoutes)
router.use("/ecommerce/orders", orderRoutes)
router.use("/ecommerce/feedbacks", feedbackRoutes)
router.use("/ecommerce/password", passwordRoutes)
router.use("/ecommerce", authenticateRoutes);

export { router };
