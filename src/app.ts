import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";

import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

dotenv.config();
const app = express();
const connectionString = process.env.DB_URI as string;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("DATABASE CONNECTED...");
  })
  .catch((err) => {
    console.error(err);
  });

export default app;
