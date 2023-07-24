import { CreateFeedbackController } from "@modules/products/useCases/createFeedback/CreateFeedbackController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { RemoveFeedbackByIdController } from "@modules/products/useCases/removeFeedbackById/RemoveFeedbackByIdController";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const feedbackRoutes = Router();

const createFeedBackController = new CreateFeedbackController();
const removeFeedbackByIdController = new RemoveFeedbackByIdController();

feedbackRoutes.post(
  "/:order_id",
  ensureAuthenticated,
  createFeedBackController.handle
);

feedbackRoutes.delete(
  "/:id",
  ensureAuthenticated,
  ensureAdmin,
  removeFeedbackByIdController.handle
);

export { feedbackRoutes };
