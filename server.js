import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express';
import { connectDB } from './config/db.js';
import doctorRouter from './routes/doctorRouter.js';
import serviceRouter from './routes/ServiceRouter.js';
import appointmentRouter from './routes/appointmentRouter.js';
import serviceAppointmentRouter from './routes/serviceAppointmentRouter.js';
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";





const app =express();
const port =4000;


/* security headers */
app.use(helmet());

/* compress API responses */
app.use(compression());

/* rate limit protection */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200
});

app.use(limiter);

const allowedOrigins =[
    "http://localhost:5173",
    "http://localhost:5174",
     "http://localhost:5175",
     "https://healthorbit-admin.vercel.app",
     "https://healthorbit.vercel.app"

];




//middlewaress\
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

      return callback(null, true);
    },
    credentials: true,
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"]
  })
);
app.use(clerkMiddleware());
app.use(express.json({limit : "20mb"}));
app.use(express.urlencoded({ limit : "20mb", extended : true}));
app.use("/uploads", express.static("uploads"));


//DB
connectDB();


//Routes

app.use("/api/doctors",doctorRouter);

app.use("/api/services",serviceRouter);
app.use("/api/appointments",appointmentRouter,);
app.use("/api/service-appointments", serviceAppointmentRouter);



app.get('/',(req,res)=>{
    res.send("API WORKING");
    
});


app.listen(port, () =>{
    console.log(`Server Started on http://localhost:${port}`);
});

