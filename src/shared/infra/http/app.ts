import "reflect-metadata";
import "dotenv/config";
import { AppError } from "@errors/AppError";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { router } from "./routes";
import cors from "cors";

import "../typeorm";
import "@shared/container";
import upload from "@config/upload";

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(cors());

app.use(express.json());
app.use("/product", express.static(`${upload.tmpFolder}/product`));
app.use("/public", express.static(`${upload.tmpFolder}/public`));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
