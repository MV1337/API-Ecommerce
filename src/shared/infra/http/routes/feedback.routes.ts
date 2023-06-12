import { CreateFeedbackController } from "@modules/products/useCases/createFeedback/CreateFeedbackController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const feedbackRoutes = Router();

const createFeedBackController = new CreateFeedbackController();

feedbackRoutes.post(
  "/:order_id",
  ensureAuthenticated,
  createFeedBackController.handle
);

export { feedbackRoutes };
