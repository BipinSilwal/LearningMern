import express from "express";
const app = express();
import morgan from "morgan";
import cors from "cors";

import dotenv from "dotenv";
//env file
dotenv.config();

import "express-async-errors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from 'path';

//middleware
import errorHandlerMiddleware from "./middleware/error-handler.js";
import { notFoundMiddleware } from "./middleware/not-found.js";

// connect to database
import connectDB from "./db/connect.js";

//routes
import authRouter from "./router/authRouter.js";
import jobsRouter from "./router/jobsRoutes.js";
import authentications from "./middleware/auth.js";



//port
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}



app.use(cors());
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(express.json());



app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authentications, jobsRouter);

app.get('*',  (req,res)=>{

    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))

}) 


//404page
app.use(notFoundMiddleware);

//error handling
app.use(errorHandlerMiddleware);

//starting server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`server starting @: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
