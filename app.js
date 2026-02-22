

import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import route from "./src/routes/route.js"; 

// Create express app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// Routes
app.use("/api/route", route);

app.use("/uploads", express.static("uploads")); // Serve uploaded files

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running!' });
});

// Export default
export default app;