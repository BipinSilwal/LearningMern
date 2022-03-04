import express from 'express';
import { notFoundMiddleware } from './middleware/not-found.js';



const app = express();



const port = process.env.PORT || 5000;


app.get('/', (req,res)=>res.end('Welcome to my Page!!'))
app.use( notFoundMiddleware);






app.listen(port, ()=>console.log(`server starting @: ${port}`));