import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";
import express, { type Request, type Response } from "express";
import { config } from "./config/app.config";
import connectDatabase from "./database/database";

const app = express();
// const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.APP_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello Express.js",
  });
});

app.listen(config.PORT, async () => {
  console.log(`Server litensing on port ${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase()
});
