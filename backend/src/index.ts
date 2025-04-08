import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import { config } from "./config/app.config";
import { HTTPSTATUS } from "./config/http.config";
import { errorHandler } from "./middlewares/errorHandler";
import { asyncHandler } from "./middlewares/asyncHandler";
import connectDatabase from "./database/database";

const app = express();

// Middleware: parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware: handle cookies
app.use(cookieParser());

// Middleware: enable CORS
app.use(
  cors({
    origin: config.APP_ORIGIN,
    credentials: true,
  })
);

// Route: health check
app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    res.status(HTTPSTATUS.OK).json({ message: "Hello Express.js" });
  })
);

// Global error handler
app.use(errorHandler);

// Start server and connect to database
const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(config.PORT, () => {
      console.log(
        `🚀 Server ready at http://localhost:${config.PORT} (${config.NODE_ENV})`
      );
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
