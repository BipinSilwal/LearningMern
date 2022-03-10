import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

 const authentication = (req,res,next)=>{

     
        const authHeader = req.headers.authorization
        
        if(!authHeader || !authHeader.startsWith('Bearer')){

                throw new UnauthenticatedError('Authentication Invalid');


        }

        const token = authHeader.split(' ')[1];

        try{

                const payload = jwt.verify(token, process.env.JWT_SECRET);  // jsonwebtoken gives a object with userID

                req.user = { userId:payload.userId } // all middleware can access user now..


        }catch(error){

                    throw new UnauthenticatedError('Authentication invalid')

        }

        
        next();




}

export default authentication;
