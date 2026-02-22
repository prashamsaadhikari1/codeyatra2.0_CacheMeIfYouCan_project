// // // app.js
// // import express from "express";
// // import helmet from "helmet";
// // import cors from "cors";
// // import route from "./routes/route.js";
// // import cookieParser from "cookie-parser";

// // //  Create express app
// // const app = express();

// // // use cookies
// // app.use(cookieParser());

// // // Middlewares
// // app.use(express.json());
// // app.use(helmet());
// // app.use(cors({
// //   origin: "http://localhost:3000",
// //   credentials: true
// // }));

// // app.use("/api/route", route);

// // //  Export default
// // export default app;


// // backend/src/app.js
// import express from 'express';

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Basic test route
// app.get('/', (req, res) => {
//   res.json({ message: 'Backend API is running!' });
// });

// export default app;


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

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running!' });
});

// Export default
export default app;