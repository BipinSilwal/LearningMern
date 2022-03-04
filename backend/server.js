import express from 'express';
import errorHandlerMiddleware from './middleware/error-handler.js';
import { notFoundMiddleware } from './middleware/not-found.js';
const app = express();

import dotenv from 'dotenv';


dotenv.config({path:'config/config.env'})



const port = process.env.PORT || 5000;


app.get('/', (req,res)=>{

        throw new Error('tero tauko!!');
        res.send('Welcome');


});



app.use( notFoundMiddleware);
app.use(errorHandlerMiddleware);






app.listen(port, ()=>console.log(`server starting @: ${port}`));