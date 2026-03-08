// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import { clerkMiddleware } from '@clerk/express';
// import { connectDB } from './config/db.js';
// import doctorRouter from './routes/doctorRouter.js';
// import serviceRouter from './routes/ServiceRouter.js';
// import appointmentRouter from './routes/appointmentRouter.js';
// import serviceAppointmentRouter from './routes/serviceAppointmentRouter.js';
// import compression from "compression";
// import helmet from "helmet";
// import rateLimit from "express-rate-limit";





// const app =express();
// const port =4000;


// /* security headers */
// app.use(helmet());

// /* compress API responses */
// app.use(compression());

// /* rate limit protection */
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 200
// });

// app.use(limiter);

// const allowedOrigins =[
//     "http://localhost:5173",
//     "http://localhost:5174",
//      "http://localhost:5175",
//      "https://healthorbit-admin.vercel.app",
//      "https://healthorbit.vercel.app"

// ];




// //middlewaress\
// app.use(
//   cors({
//     origin: function (origin, callback) {

//       if (!origin) return callback(null, true);

//       if (
//         allowedOrigins.includes(origin) ||
//         origin.includes("vercel.app")
//       ) {
//         return callback(null, true);
//       }

//       return callback(null, true);
//     },
//     credentials: true,
//     methods: ["GET","POST","PUT","DELETE","OPTIONS"],
//     allowedHeaders: ["Content-Type","Authorization"]
//   })
// );
// app.use(clerkMiddleware());
// app.use(express.json({limit : "20mb"}));
// app.use(express.urlencoded({ limit : "20mb", extended : true}));
// app.use("/uploads", express.static("uploads"));


// //DB
// connectDB();


// //Routes

// app.use("/api/doctors",doctorRouter);

// app.use("/api/services",serviceRouter);
// app.use("/api/appointments",appointmentRouter,);
// app.use("/api/service-appointments", serviceAppointmentRouter);



// app.get('/',(req,res)=>{
//     res.send("API WORKING");
    
// });


// app.listen(port, () =>{
//     console.log(`Server Started on http://localhost:${port}`);
// });

import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";

import { connectDB } from "./config/db.js";
import doctorRouter from "./routes/doctorRouter.js";
import serviceRouter from "./routes/ServiceRouter.js";
import appointmentRouter from "./routes/appointmentRouter.js";
import serviceAppointmentRouter from "./routes/serviceAppointmentRouter.js";

import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();
const port = process.env.PORT || 4000;

/* ============================= */
/* TRUST PROXY (IMPORTANT FOR RENDER) */
/* ============================= */
app.set("trust proxy", 1);

/* ============================= */
/* SECURITY HEADERS */
/* ============================= */
app.use(helmet());

/* ============================= */
/* COMPRESS API RESPONSES */
/* ============================= */
app.use(compression());

/* ============================= */
/* RATE LIMIT PROTECTION */
/* ============================= */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: "Too many requests, please try again later."
});

app.use(limiter);

/* ============================= */
/* ALLOWED ORIGINS */
/* ============================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "https://healthorbit-admin.vercel.app",
  "https://healthorbit.vercel.app"
];

/* ============================= */
/* CORS CONFIGURATION */
/* ============================= */
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        origin.includes("vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

/* ============================= */
/* CLERK AUTH MIDDLEWARE */
/* ============================= */
app.use(clerkMiddleware());

/* ============================= */
/* BODY PARSER */
/* ============================= */
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

/* ============================= */
/* STATIC FILES */
/* ============================= */
app.use("/uploads", express.static("uploads"));

/* ============================= */
/* DATABASE CONNECTION */
/* ============================= */
connectDB();

/* ============================= */
/* ROUTES */
/* ============================= */
app.use("/api/doctors", doctorRouter);
app.use("/api/services", serviceRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/service-appointments", serviceAppointmentRouter);

/* ============================= */
/* HEALTH CHECK ROUTE */
/* ============================= */
app.get("/", (req, res) => {
  res.send("API WORKING 🚀");
});

/* ============================= */
/* GLOBAL ERROR HANDLER */
/* ============================= */
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message || "Server Error"
  });
});

/* ============================= */
/* START SERVER */
/* ============================= */
app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});

