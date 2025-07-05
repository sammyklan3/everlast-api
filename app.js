import express from "express";
const app = express();
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import cors from "cors";
import { swaggerSpec, swaggerUi } from "./config/swagger.js";

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use("/api", routes);

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
