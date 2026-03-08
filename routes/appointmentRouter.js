import  express from 'express';
import { clerkMiddleware,requireAuth } from '@clerk/express';
import { cancelAppointment, confirmPayment, createAppointment, getAppointments, getAppointmentsByDoctor, getAppointmentsBypatient, getRegisteredUserCount, getStats, updateAppointment } from '../controllers/appointmentController.js';



const appointmentRouter= express.Router();


appointmentRouter.get("/", getAppointments);
appointmentRouter.get("/confirm", confirmPayment);
appointmentRouter.get("/stats/summary", getStats);


// authentic routes

 appointmentRouter.post('/', clerkMiddleware(),requireAuth(), createAppointment);
 appointmentRouter.get('/me',clerkMiddleware(), requireAuth(), getAppointmentsBypatient);


 appointmentRouter.get("/doctor/:doctorId",getAppointmentsByDoctor);
 appointmentRouter.post("/:id/cancel", cancelAppointment);
 appointmentRouter.get('/paitents/count', getRegisteredUserCount);
 appointmentRouter.put("/:id",updateAppointment);


  export default appointmentRouter;