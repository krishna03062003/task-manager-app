import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";



import connectDB from "./config/db.js";
import authrouter from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import protect from "./middleware/authMiddleware.js";
// load env variables
dotenv.config();

// connect database
connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// health
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// error handle globle
app.use(errorHandler);

// test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.get("/api/protected", protect, (req, res) => {
  res.json({ message: "Authorized" });
});

// auth routes
app.use("/api/auth", authrouter);

// task routes
app.use("/api/tasks", taskRoutes);

//error handle  


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});