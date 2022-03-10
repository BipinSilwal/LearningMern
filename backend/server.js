import express from 'express';
const app = express();
import morgan from 'morgan';
import cors from 'cors';

import dotenv from 'dotenv';
import 'express-async-errors';

//middleware
import errorHandlerMiddleware from './middleware/error-handler.js';
import { notFoundMiddleware } from './middleware/not-found.js';

// connect to database
import connectDB from './config/db/connect.js';

//routes
import authRouter from './router/authRouter.js';
import jobsRouter from './router/jobsRoutes.js';
import  authentication  from './middleware/auth.js';

//env file
dotenv.config({path:'config/config.env'})


//port
const port = process.env.PORT || 5000;

if(process.env.NODE_ENV !=='production'){

                app.use(morgan('dev'));

};


app.use(cors());
app.use(express.json());


app.use( '/api/v1/auth' ,authRouter);
app.use( '/api/v1/jobs' , authentication, jobsRouter);











//404page
app.use( notFoundMiddleware);

//error handling
app.use(errorHandlerMiddleware);







//starting server
const start = async()=>{
        
        try {
                await connectDB(process.env.MONGO_URL);
                app.listen(port, ()=>console.log(`server starting @: ${port}`));

        } catch (error) {
                console.log(error)
        }

}

start();