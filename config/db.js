// import mongoose from  "mongoose";
//   export const connectDB =async ()=>{
//      await mongoose.connect("mongodb://localhost:27017/Medicare")

//     .then(()=>{
//         console.log("DB connected")
//     })
 
//  }

import dns from 'dns';
import mongoose from "mongoose";

dns.setServers(['8.8.8.8', '8.8.4.4']);

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://jadhavanilsitit_db_user:qs7bcFkS9JXErbk4@cluster0.ig4lges.mongodb.net/?appName=Cluster0"
    );

    console.log("DB connected");
  } catch (err) {
    console.error("DB connection error:", err);
  }
};